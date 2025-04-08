'use strict';

// This file is injected to /protected/syncing and is used to pass
// messages between the window of Recode and the extension's background.js

import { Messages, Sources } from './enum';
import { isValidMessage, isValidSource } from './utils';

const uploadSubmissionsToRecode = () => {
  // TODO: Make fetches to api/submissions
  console.log('uploadSubmissionsToRecode');
};

// Listen to messages from chrome runtime, aka, the extension's background.js
chrome.runtime.onMessage.addListener(() => {
  //   if (isValidMessage(type) && isValidSource(source)) {
  //     console.log('[Sync Content Script], received message from runtime');
  //     console.log(type, source, data);
  //   }
});

// Listen for messages from the window object and forward them to the background.js
window.addEventListener('message', (event) => {
  // TODO: add cross origin check
  const { message, data } = event.data;

  //   if (!isValidMessage(type) || !isValidSource(source)) {
  //     console.warn('Invalid message or source', { type, source, data });
  //     return;
  //   }

  console.log('[Sync Content Script], received message ');
  console.log({ message, data });

  // We get an indication to start the sync process, let background.js know
  if (message === Messages.START_FETCH) {
    chrome.runtime.sendMessage({
      message,
      data,
    });
  }
});
