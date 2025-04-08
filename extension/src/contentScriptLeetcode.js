'use strict';

// This file is injected to Leetcode.com and is used to pass messages
// between the window of Leetcode and the extension's background.js

import { Messages, Sources } from './enum';
import { isValidMessage, isValidSource } from './utils';

const fetchSubmissionsFromLeetcode = () => {
  // TODO: Make fetches to api/submissions
  console.log('fetchSubmissionsFromLeetcode');
};

// Listen to messages from chrome runtime, aka, the extension's background.js
chrome.runtime.onMessage.addListener(
  ({ message, data }, sender, sendResponse) => {
    console.log('[Leetcode Content Script], received message from runtime');
    console.log({ message, data });
    // sendResponse();
  }
);

// Listen for messages from the window object and forward them to the background.js
window.addEventListener('message', (event) => {
  // Optional: Check the origin of the message if necessary
  // if (event.origin !== 'your-origin') return;
});
