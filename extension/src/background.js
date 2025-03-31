'use strict';

// With background scripts you can communicate extension files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    tab?.url?.startsWith('https://leetcode.com') &&
    changeInfo?.status == 'complete'
  ) {
    console.log('Switched to Leetcode');
    console.log({ tabId, changeInfo, tab });
  }

  if (
    tab?.url?.startsWith('http://localhost:3000/protected') &&
    changeInfo?.status == 'complete'
  ) {
    console.log('Logged in');
    console.log({ tabId, changeInfo, tab });

    try {
      const cookies = await chrome.cookies.getAll({ url: tab.url });
      console.log('Cookies for this page:');
      cookies.forEach((cookie) => {
        console.log(`Name: ${cookie.name}, Value: ${cookie.value}`);
      });
    } catch (error) {
      console.error('Error retrieving cookies:', error);
    }
  }
});
