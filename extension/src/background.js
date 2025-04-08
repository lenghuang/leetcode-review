'use strict';

// This file is the background service worker. Since it neither has permissions to
// Leetcode nor Recode's windows, we cannot make API requests here. However, neither
// of those two can communicate with one another. So we need this background service
// to proxy messages between LeetCode and Recode.

import { Messages } from './enum';

const firstCompleteTab = (tabs) => tabs.find((t) => t.status === 'complete');

const prefixedLog = (...args) => console.log('[Background]', ...args);

// Add a listener for messages from the content scripts
chrome.runtime.onMessage.addListener(
  ({ message, data }, sender, sendResponse) => {
    // if (!isValidMessage(type) || !isValidSource(source)) {
    //   console.warn('Invalid message or source', { type, source, data });
    //   return;
    // }

    prefixedLog('Received message', { message, data });

    // We get an indication to start the sync process, let LC content script know
    if (message === Messages.START_FETCH) {
      chrome.tabs.query(
        {
          url: ['*://*.leetcode.com/*', '*://leetcode.com/*'],
        },
        async (tabs) => {
          const targetTab = firstCompleteTab(tabs);
          if (targetTab) {
            prefixedLog('targeting tab', targetTab);
            await chrome.scripting.executeScript({
              target: { tabId: targetTab.id },
              files: ['contentScriptLeetcode.js'],
            });
            try {
              await chrome.tabs
                .sendMessage(targetTab.id, {
                  message,
                  data,
                })
                .then((response) => {
                  prefixedLog(
                    'received response from LC content script',
                    response
                  );
                  sendResponse(response);
                });
            } catch (error) {
              console.error(
                '[Background], error sending message to LC content script',
                error
              );
              sendResponse(error);
            }
          }
        }
      );
    }
  }
);
