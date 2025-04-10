'use strict';

import { Messages } from './enum';

const firstCompleteTab = (tabs) => tabs.find((t) => t.status === 'complete');

const prefixedLog = (...args) => console.log('[Background]', ...args);

// Add a listener for messages from the content scripts
chrome.runtime.onMessage.addListener(
  ({ message, data }, sender, sendResponse) => {
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
            try {
              await chrome.scripting.executeScript({
                target: { tabId: targetTab.id },
                files: ['contentScriptLeetcode.js'],
              });
              chrome.tabs.sendMessage(targetTab.id, {
                message,
                data,
              });
            } catch (error) {
              prefixedLog('error caught', error);
            }
          }
        }
      );
    }

    // We have successfully triggered the fetch process and are connected
    if (message === Messages.START_FETCH_ACK) {
      chrome.tabs.query(
        {
          url: ['*://leetcode-review.vercel.app/*', 'http://localhost/*'],
        },
        async (tabs) => {
          const targetTab = firstCompleteTab(tabs);
          if (targetTab) {
            prefixedLog('targeting tab', targetTab);
            try {
              await chrome.scripting.executeScript({
                target: { tabId: targetTab.id },
                files: ['contentScriptSync.js'],
              });
              chrome.tabs.sendMessage(targetTab.id, {
                message,
                data,
              });
            } catch (error) {
              prefixedLog('error caught', error);
            }
          }
        }
      );
    }

    // Handle successful data retrieval
    if (message === Messages.LC_DATA) {
      // Forward LeetCode submissions to sync script
      chrome.tabs.query(
        {
          url: ['*://leetcode-review.vercel.app/*', 'http://localhost/*'],
        },
        (tabs) => {
          const targetTab = firstCompleteTab(tabs);
          if (targetTab) {
            chrome.tabs.sendMessage(targetTab.id, {
              message,
              data,
            });
          }
        }
      );
    }

    // Pass through other messages
    if (message === Messages.DONE_FETCH || message === Messages.FETCH_ERROR) {
      chrome.tabs.query(
        {
          url: ['*://leetcode-review.vercel.app/*', 'http://localhost/*'],
        },
        (tabs) => {
          const targetTab = firstCompleteTab(tabs);
          if (targetTab) {
            chrome.tabs.sendMessage(targetTab.id, {
              message,
              data,
            });
          }
        }
      );
    }
  }
);
