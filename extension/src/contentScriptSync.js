'use strict';

// This file is injected to /protected/syncing and is used to pass
// messages between the window of Recode and the extension's background.js

import { Messages } from './enum';
import { isValidMessage } from './utils';

const uploadSubmissionsToRecode = () => {
  // TODO: Make fetches to api/submissions
  console.log('uploadSubmissionsToRecode');
};

const prefixedLog = (...args) => {
  console.log('[Sync Content Script]', ...args);
};

// Listen for messages from the window object and forward them to the background.js
window.addEventListener('message', async (event) => {
  // TODO: add cross origin check
  const { message, data } = event.data;

  prefixedLog('Received message from window', { message, data });

  // We get an indication to start the sync process, let background.js know
  if (message === Messages.START_FETCH) {
    await chrome.runtime
      .sendMessage({
        message,
        data,
      })
      .then((resp) =>
        prefixedLog('Result from initial StartFetch Message', resp)
      )
      .catch((err) => prefixedLog('Exception caught', err));
  }

  // https://developer.chrome.com/docs/extensions/develop/concepts/messaging#simple:~:text=you%20must%20return%20a%20literal%20true
  // We do not return here since we expect the content scripts to call "sendResponse"

  // Actually, is that what I want? How about starting to send data?
  // I think its fine, I can use this to set up displaying a "Connected to Leetcode" UI
});
