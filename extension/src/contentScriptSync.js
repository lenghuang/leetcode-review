'use strict';

import { Messages } from './enum';

const prefixedLog = (...args) => {
  console.log('[Sync Content Script]', ...args);
};

const uploadSubmissionsToRecode = async (submissions) => {
  try {
    prefixedLog('DUMMY UPLOADING SUBMISSIONS TO RECODE');

    // Send upload confirmation back to the extension
    // chrome.runtime.sendMessage({
    //   message: Messages.DONE_FETCH,
    //   data: result,
    // });
  } catch (error) {
    prefixedLog('Submission upload failed', error);

    chrome.runtime.sendMessage({
      message: Messages.FETCH_ERROR,
      data: {
        source: 'Recode Upload',
        errorMessage: error.message,
      },
    });
  }
};

// Listen for messages from the window object and forward them to the background.js
window.addEventListener('message', async (event) => {
  if (event.origin !== window.location.origin) {
    prefixedLog('Possible cross-site scripting attack!');
    return;
  }

  if (!event.data) {
    prefixedLog('Empty data');
    return;
  }

  const { message, data } = event.data;

  prefixedLog('Received message from window', { message, data });

  // We get an indication to start the sync process, let background.js know
  if (message === Messages.START_FETCH) {
    try {
      chrome.runtime.sendMessage({
        message,
        data,
      });
    } catch (err) {
      prefixedLog('Exception caught', err);

      chrome.runtime.sendMessage({
        message: Messages.FETCH_ERROR,
        data: {
          source: 'Sync Initialization',
          errorMessage: err.message,
        },
      });
    }
  }
});

// Listen to messages from chrome runtime, aka, the extension's background.js
chrome.runtime.onMessage.addListener(async ({ message, data }, sender) => {
  if (message === Messages.START_FETCH_ACK) {
    prefixedLog('Received ack from background, send it to site', {
      message,
      data,
    });

    window.postMessage({ message }, '*');
  }

  if (message === Messages.LC_DATA) {
    prefixedLog('Received data from background, send it to site', {
      message,
      data,
    });

    // If we received LeetCode submissions data, upload to Recode
    if (data) {
      await uploadSubmissionsToRecode(data);
    }

    window.postMessage({ message, data }, '*');
  }
});
