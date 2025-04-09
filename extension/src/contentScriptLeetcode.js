'use strict';

// This file is injected to Leetcode.com and is used to pass messages
// between the window of Leetcode and the extension's background.js

import { Messages } from './enum';

const fetchSubmissionsFromLeetcode = () => {
  // TODO: Make fetches to api/submissions
  console.log('fetchSubmissionsFromLeetcode');
};

const prefixedLog = (...args) => {
  console.log('[Leetcode Content Script]', ...args);
};

// Listen to messages from chrome runtime, aka, the extension's background.js
chrome.runtime.onMessage.addListener(({ message, data }, sender) => {
  if (message === Messages.START_FETCH) {
    prefixedLog('Received start message from runtime, sending that data back', {
      message,
      data,
    });
    chrome.runtime.sendMessage({ message: Messages.START_FETCH_ACK });
  }
});

// Listen for messages from the window object and forward them to the background.js
window.addEventListener('message', (event) => {
  // Optional: Check the origin of the message if necessary
  if (event.origin !== window.location.origin) {
    prefixedLog('Possible cross-site scripting attack!');
    return;
  }
  // https://developer.chrome.com/docs/extensions/develop/concepts/messaging#simple:~:text=you%20must%20return%20a%20literal%20true
  // return true;
});
