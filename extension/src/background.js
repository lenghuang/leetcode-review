'use strict';

// This file is the background service worker. Since it neither has permissions to
// Leetcode nor Recode's windows, we cannot make API requests here. However, neither
// of those two can communicate with one another. So we need this background service
// to proxy messages between LeetCode and Recode.

import { Messages, Sources } from './enum';
import { isValidMessage, isValidSource } from './utils';

const firstCompleteTab = (tabs) => tabs.find((t) => t.status === 'complete');

// Add a listener for messages from the content scripts
chrome.runtime.onMessage.addListener(({ message, data }, sender) => {
  // if (!isValidMessage(type) || !isValidSource(source)) {
  //   console.warn('Invalid message or source', { type, source, data });
  //   return;
  // }

  console.log('[Background], received message ');
  console.log({ message, data, sender });

  // We get an indication to start the sync process, let LC content script know
  if (message === Messages.START_FETCH) {
    chrome.tabs.query(
      {
        url: ['*://*.leetcode.com/*', '*://leetcode.com/*'],
      },
      async (tabs) => {
        const targetTab = firstCompleteTab(tabs);
        if (targetTab) {
          console.log('targeting tab', targetTab);
          await chrome.scripting.executeScript({
            target: { tabId: targetTab.id },
            files: ['contentScriptLeetcode.js'],
          });
          await chrome.tabs.sendMessage(targetTab.id, {
            message,
            data,
          });
        }
      }
    );
  }

  // https://developer.chrome.com/docs/extensions/develop/concepts/messaging#simple:~:text=you%20must%20return%20a%20literal%20true
  return true;
});
