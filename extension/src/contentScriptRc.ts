import { Config } from './config';
import { Messages, MessageData } from './enums';

// Logging Helper
const log = (...args: any[]) => {
  if (Config.IS_DEV) {
    console.log('[ContentScriptRc]', ...args);
  }
};

// Message Handlers
const handleLcSendingData = (payload: MessageData) => {
  log('forwardLeetcodeDataToRecode', payload);
};

const handleLcDoneSendingData = () => {
  log('done sending data');
};

const handleRcIsLoggedInNotification = () => {
  log('letting background service know');
  chrome.runtime.sendMessage({
    message: Messages.LOGIN_STATUS_UPDATE,
    payload: { isRcLoggedIn: true },
  });
};

// Event Listeners

// We have received a message, most likely from background.js who is letting us know two
// things: that we are either getting new data from LeetCode, or that we are done.
chrome.runtime.onMessage.addListener(async (payload: MessageData, sender) => {
  // Dispatch based on message type
  switch (payload.message) {
    case Messages.LC_SENDING_DATA:
      handleLcSendingData(payload);
      break;
    case Messages.LC_DONE_SENDING_DATA:
      handleLcDoneSendingData();
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
    case Messages.LOGIN_STATUS_UPDATE:
      // This content script doesn't need to handle incoming LOGIN_STATUS_UPDATE messages,
      // as it only reports its own login status.
      break;
    default:
      log('Unrecognized message type', { event });
  }

  return true;
});
