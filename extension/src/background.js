'use strict';

/**
 * @enum {string}
 */
const WatchedUrls = {
  leetcodeUs: 'https://leetcode.com',
  recodeProtectedProd: 'http://localhost:3000/protected',
  recodeProtectedLocal: 'http://localhost:3000/protected',
};

/**
 * Extracts Supabase authentication cookies from a list of cookies.
 * @param {chrome.cookies.Cookie[]} cookies - An array of cookie objects.
 * @returns {{authToken: string, codeVerifier: string}} An object containing the filtered cookies.
 */
function extractSupabaseCookies(cookies) {
  /** @type {{authToken: string, codeVerifier: string}} */
  const cookieObject = {
    authToken: null,
    codeVerifier: null,
  };

  cookies.forEach((cookie) => {
    if (cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token')) {
      cookieObject.authToken = cookie.value;
    } else if (
      cookie.name.startsWith('sb-') &&
      cookie.name.endsWith('-auth-token-code-verifier')
    ) {
      cookieObject.codeVerifier = cookie.value;
    }
  });

  return cookieObject;
}

/**
 * Processes cookies for a given tab, filtering for specific cookie names,
 * storing them in local storage, and sending a message to the extension popup.
 * @param {chrome.tabs.Tab} tab - The tab object for which to process cookies.
 * @returns {Promise<void>}
 */
async function processCookies(tab) {
  try {
    // Retrieve all cookies for the given URL.
    const cookies = await chrome.cookies.getAll({ url: tab.url });

    // Extract supabase cookies
    const { authToken, codeVerifier } = extractSupabaseCookies(cookies);

    // Store the filtered cookies in the extension's local storage.
    console.log('Storing cookies: ', { authToken, codeVerifier });
    await chrome.storage.local.set({ authToken, codeVerifier });
  } catch (error) {
    // Log any errors that occur during the cookie processing.
    console.error('Error retrieving cookies:', error);
  }
}

/**
 * Handles tab update events, processing cookies when specific URLs are loaded.
 * @param {number} tabId - The ID of the tab that was updated.
 * @param {chrome.tabs.TabChangeInfo} changeInfo - Information about the changes to the tab.
 * @param {chrome.tabs.Tab} tab - The updated tab object.
 * @returns {Promise<void>}
 */
async function handleTabUpdate(tabId, changeInfo, tab) {
  // Check if the tab URL starts with "https://leetcode.com" and the status is 'complete'.
  if (
    tab?.url?.startsWith(WatchedUrls.leetcodeUs) &&
    changeInfo?.status === 'complete'
  ) {
    console.log('Switched to Leetcode');
    console.log({ tabId, changeInfo, tab });
  }

  // Check if the tab URL starts with "http://localhost:3000/protected" and the status is 'complete'.
  if (
    tab?.url?.startsWith(WatchedUrls.recodeProtectedLocal) &&
    changeInfo?.status === 'complete'
  ) {
    console.log({ tabId, changeInfo, tab });

    // Process the cookies for the current tab.
    await processCookies(tab);
  }
}

// Add a listener for when a tab is updated.
chrome.tabs.onUpdated.addListener(handleTabUpdate);
