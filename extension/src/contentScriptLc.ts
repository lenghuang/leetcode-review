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
  log('got status', { ok, redirected });
  if (redirected) {
    return true;
  }
  if (ok) {
    return false;
  }
  log('Something wrong, returning false, not logged in');
  return false;
};

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

  const isLoggedIn = await isLoggedInToLeetcode();
  chrome.runtime.sendMessage({
    message: Messages.LC_IS_LOGGED_IN_NOTIFICATION,
    data: { isLoggedIn },
  });
} catch (err) {
  log('somethingw went wrong', err);
}
