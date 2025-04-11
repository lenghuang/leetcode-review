// content_script.ts

import { Config } from './config';
import { Messages, MessageData } from './enums';

const log = (...args: any[]) => {
  if (Config.IS_DEV) {
    console.log('[ContentScriptRc]', ...args);
  }
};

const forwardLeetcodeDataToRecode = (data: any) => {
  log('forwardLeetcodeDataToRecode', data);
};

const notifyDoneSendingData = () => {
  log('done sending data');
};

const letBackgroundServiceKnow = () => {
  log('letting background service know');
  chrome.runtime.sendMessage({
    message: Messages.RC_IS_LOGGED_IN_NOTIFICATION,
  });
};

// We have received a message, most likely from background.js who is letting us know two
// things: that we are either getting new data from LeetCode, or that we are done.
chrome.runtime.onMessage.addListener(async (payload: MessageData, sender) => {
  // Dispatch based on message type
  switch (payload.message) {
    case Messages.LC_SENDING_DATA:
      forwardLeetcodeDataToRecode(payload.data);
      break;
    case Messages.LC_DONE_SENDING_DATA:
      notifyDoneSendingData();
      break;
    default:
      log('Unrecognized message type', { payload, sender });
      break;
  }

  return true;
});

// We have received a message, most likely from Recode.ai, notifying us that
// the user has succesfully loaded and rendered the protected/syncing page.
window.addEventListener('message', async (event) => {
  if (event.origin !== window.location.origin) {
    log('possible cross origin request', event);
    return;
  }

  const { message, data } = event.data as MessageData;
  log('got message', event.data);
  switch (message) {
    case Messages.RC_IS_LOGGED_IN_NOTIFICATION:
      letBackgroundServiceKnow();
      break;
    default:
      log('Unrecognized message type', { event });
  }

  return true;
});
