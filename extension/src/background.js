'use strict';

const WatchedUrls = {
  leetcodeUs: 'https://leetcode.com',
  recodeProtectedProd: 'http://localhost:3000/protected',
  recodeProtectedLocal: 'http://localhost:3000/protected',
};

function isSupabaseAuthCookie(cookie) {
  // Check if the cookie name starts with "sb-" and ends with
  // "-auth-token" or "-auth-token-code-verifier".
  return (
    cookie.name.startsWith('sb-') &&
    (cookie.name.endsWith('-auth-token') ||
      cookie.name.endsWith('-auth-token-code-verifier'))
  );
}

/**
 * Processes cookies for a given tab, filtering for specific cookie names,
 * storing them in local storage, and sending a message to the extension popup.
 *
 * @param {chrome.tabs.Tab} tab The tab object for which to process cookies.
 */
async function processCookies(tab) {
  try {
    // Retrieve all cookies for the given URL.
    const cookies = await chrome.cookies.getAll({ url: tab.url });

    const cookieObject = {};

    // Iterate through each cookie and filter based on the name.
    cookies.forEach((cookie) => {
      if (isSupabaseAuthCookie(cookie)) {
        cookieObject[cookie.name] = cookie.value; // Store the cookie in the object.
      }
    });

    // Store the filtered cookies in the extension's local storage.
    console.log('Storing cookies: ', cookieObject);
    await chrome.storage.local.set({ cookies: cookieObject });
  } catch (error) {
    // Log any errors that occur during the cookie processing.
    console.error('Error retrieving cookies:', error);
  }
}

// Add a listener for when a tab is updated.
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Check if the tab URL starts with "https://leetcode.com" and the status is 'complete'.
  if (
    tab?.url?.startsWith(WatchedUrls.leetcodeUs) &&
    changeInfo?.status == 'complete'
  ) {
    console.log('Switched to Leetcode');
    console.log({ tabId, changeInfo, tab });
  }

  // Check if the tab URL starts with "http://localhost:3000/protected" and the status is 'complete'.
  if (
    tab?.url?.startsWith(WatchedUrls.recodeProtectedLocal) &&
    changeInfo?.status == 'complete'
  ) {
    console.log({ tabId, changeInfo, tab });

    // Process the cookies for the current tab.
    await processCookies(tab);
  }
});
