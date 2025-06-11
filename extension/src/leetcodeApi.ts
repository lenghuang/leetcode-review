// This file contains functions for interacting with the LeetCode API.

import { Config } from './config';
import { Messages } from './enums';

// Helper function for logging messages with a source prefix.
export const log = (...args: any[]) => {
  if (Config.IS_DEV) {
    console.log('[LeetCode API]', ...args);
  }
};

export const enumerateSubmissions = async () => {
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

      // Send partial data to the background script
      chrome.runtime.sendMessage({
        message: Messages.LC_SENDING_DATA,
        data: data, // Send the entire response body
      });
    } catch (error) {
      log('Error fetching submissions:', error);
      // Implement more sophisticated error handling if needed:
      // - Limited number of retries before giving up
      // - Different delays for different error types
      break; // Stop fetching if a non-recoverable error occurs
    }
  }

  // Send partial data to the background script
  chrome.runtime.sendMessage({
    message: Messages.LC_DONE_SENDING_DATA,
  });
  return allSubmissions;
};
