'use strict';

// With background scripts you can communicate extension files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log({ tabId, changeInfo, tab });
  if (changeInfo.url?.startsWith('https://leetcode.com')) {
    console.log('Switched to Leetcode');
  }
});
