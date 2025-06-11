// content_script.ts

import { Config } from './config';
import { Messages, MessageData } from './enums';

const log = (...args: any[]) => {
  if (Config.IS_DEV) {
    console.log('[ContentScriptLc]', ...args);
  }
};

// Check if the user is logged in to LeetCode. A 200 response indicates they're
// logged out and a 302 response indicates that they're logged in.
const checkStatusCodeForPage = async (
  urlString: string
): Promise<{ ok: boolean; redirected: boolean }> => {
  try {
    const url = new URL(urlString); // Validate URL
    // Use fetch to check the URL.
    const response = await fetch(url, {
      method: 'GET',
    });
    return { ok: response.ok, redirected: response.redirected }; // Check for 200-299 status codes.
  } catch (error) {
    console.error(`Error fetching ${urlString}: ${error}`);
    return { ok: false, redirected: false };
  }
};

const isLoggedInToLeetcode = async () => {
  const { ok, redirected } = await checkStatusCodeForPage(
    `${Config.LC_HOST}${Config.LC_LOGIN_PATH}`
  );
  log('got logged in status', { ok, redirected });
  if (redirected) {
    return true;
  }
  if (ok) {
    return false;
  }
  log('Something wrong, returning false, not logged in');
  return false;
};

const enumerateSubmissions = async () => {
  console.log('enter enumerateSubmssions');
  let page = 0;
  const pageSize = 20;
  let lastKey = '';
  let allSubmissions: object[] = [];
  let hasNext = true;

  // --- NEW PARAMETERS FOR FIXED INTERVAL + BATCH BREAK ---
  const requestsPerBatch = 5; // Number of requests to make before a break
  const interRequestDelayMs = 2000; // 2 seconds delay between requests within a batch
  const batchBreakDelayMs = 5000; // 5 seconds delay after a batch (before the next batch starts)
  // --- END NEW PARAMETERS ---

  while (hasNext) {
    const offset = page * pageSize;
    const url = `https://leetcode.com/api/submissions/?offset=${offset}&limit=${pageSize}&lastkey=${lastKey}`;

    // --- DELAY LOGIC FOR FIXED INTERVAL + BATCH BREAK ---
    // Apply delay only from the second request (page > 0) onwards
    if (page > 0) {
      // Check if it's the start of a new batch (e.g., page 5, 10, 15, etc.)
      // For page 0, 1, 2, 3, 4, it's NOT the start of a new batch.
      // For page 5, it IS the start of a new batch.
      if (page % requestsPerBatch === 0) {
        // log(
        //   `Taking a ${
        //     batchBreakDelayMs / 1000
        //   } second break before starting batch for page ${page}...`
        // );
        await new Promise((resolve) => setTimeout(resolve, batchBreakDelayMs));
        // log(`Resuming requests after break for page ${page}.`);
      } else {
        // It's a request within the current batch (e.g., page 1, 2, 3, 4, 6, 7, etc.)
        // log(
        //   `Waiting ${
        //     interRequestDelayMs / 1000
        //   } seconds before fetching page ${page}...`
        // );
        await new Promise((resolve) =>
          setTimeout(resolve, interRequestDelayMs)
        );
      }
    }
    // --- END DELAY LOGIC ---

    log(`Fetching: ${url}`); // Log the URL *after* the delay

    try {
      const response = await fetch(url, {
        referrer: 'https://leetcode.com/submissions/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });

      if (!response.ok) {
        // --- IMPORTANT: ROBUST ERROR HANDLING ---
        // If you encounter a rate limit (HTTP 429) or a server error (500s),
        // your fixed strategy might still hit issues. Consider a more aggressive
        // emergency backoff here, or even stopping if it persists.
        if (response.status === 403) {
          log(
            'Rate limit hit (HTTP 403)! Waiting for 5 seconds before retrying...'
          );
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
          // You might want to 'continue' here instead of throwing,
          // to retry the same page after the extended delay.
          // page--; // Decrement page to re-attempt the current page after delay
          // continue;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // log(data); // Uncomment if you want to see the full response data for debugging
      const submissions = data.submissions_dump;
      allSubmissions = allSubmissions.concat(submissions);
      hasNext = data.has_next;
      lastKey = data.last_key;
      page += 1; // Increment the page counter for the next iteration
    } catch (error) {
      log('Error fetching submissions:', error);
      // Implement more sophisticated error handling if needed:
      // - Limited number of retries before giving up
      // - Different delays for different error types
      break; // Stop fetching if a non-recoverable error occurs
    }
  }

  return allSubmissions;
};

// Ensure you have a 'log' function defined, e.g.:
// const log = (...args) => console.log(...args);

// We have received a message, most likely from background.js who asks us to
// two things: if the user is logged in to Leetcode, and for us to start sending data.
chrome.runtime.onMessage.addListener(async (payload: MessageData, sender) => {
  // Dispatch based on message type
  switch (payload.message) {
    // TODO: Actually, only need to handle "start fetch submissions" from popup

    default:
      log('Unrecognized message type', { payload, sender });
      break;
    // Add more cases as needed
  }

  return true;
});

// idk if i need this rn
window.addEventListener('message', async (event) => {
  if (event.origin !== window.location.origin) {
    return;
  }

  // TODO: this is the layer between my site and my background code.
  // just need to forward LC_DATA and DOne
});

try {
  log('script loaded');

  const res = await enumerateSubmissions();

  log(res);

  log('done script loaded');

  const isLoggedIn = await isLoggedInToLeetcode();
  chrome.runtime.sendMessage({
    message: Messages.LC_IS_LOGGED_IN_NOTIFICATION,
    data: { isLoggedIn },
  });
} catch (err) {
  log('somethingw went wrong', err);
}
