'use strict';

import { Config } from './config';
import { createTabInWindow } from './chromeUtils';
import { MessageData, Messages } from './enums';

/**
 * State Variables
 */
let lcTabId: number | undefined;
let rcTabId: number | undefined;

let isLcLoggedIn = false;
let isRcLoggedIn = false;

/**
 * Logging Helper
 */
const log = (...args: any[]) => {
  if (Config.IS_DEV) {
    console.log('[Background]', ...args);
  }
};

/**
 * Initialization Logic
 */

const openTwoMoreTabs = async (window: chrome.windows.Window | undefined) => {
  // After the window is created, open two more tabs within the same window
  // Check if the window was successfully created and has an ID
  if (window && window.id) {
    // Create a new tab in the created window for the LC Login
    const lcTab = await createTabInWindow(
      window.id,
      `${Config.LC_HOST}${Config.LC_LOGIN_PATH}`
    );
    lcTabId = lcTab?.id;
    log('LC Tab ID:', lcTabId);
    // TODO: Do we want to load in content scripts here? Do we need to figure out if it's been loaded and store that?
    // Create another new tab in the created window for the RC Login
    const rcTab = await createTabInWindow(
      window.id,
      `${Config.RC_HOST}${Config.RC_LOGIN_PATH}`
    );
    rcTabId = rcTab?.id;
    log('RC Tab ID:', rcTabId);
  } else {
    // Handle the error case where the window was not created or the ID is missing
    log('Window / Window ID missing', window);
  }
};

// Listen for when the extension icon is clicked
chrome.action.onClicked.addListener((activeTab: chrome.tabs.Tab) => {
  chrome.windows.create(
    {
      url: chrome.runtime.getURL('popup.html'),
      height: 800,
      width: 400,
      type: 'normal', // Specify the window type for better consistency
    },
    (window) => {
      openTwoMoreTabs(window);
      // Send initial login status to all tabs, including the popup
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.id) {
            chrome.tabs.sendMessage(tab.id, {
              message: Messages.LOGIN_STATUS_UPDATE,
              payload: { isLcLoggedIn, isRcLoggedIn },
            });
          }
        });
      });
    }
  );
});

/**
 * Listening
 */

// Listen for messages from content scripts or popup
const handleLcIsLoggedInNotification = (
  payload: MessageData,
  sender: chrome.runtime.MessageSender
) => {
  log('LC Is logged in ', { payload, sender });
  if (payload.payload && payload.payload.isLcLoggedIn !== undefined) {
    isLcLoggedIn = payload.payload.isLcLoggedIn;
    // Send update to all tabs, including the popup
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, {
            message: Messages.LOGIN_STATUS_UPDATE,
            payload: { isLcLoggedIn, isRcLoggedIn },
          });
        }
      });
    });
  }
};

const handleRcIsLoggedInNotification = (
  payload: MessageData,
  sender: chrome.runtime.MessageSender
) => {
  log('RC Is logged in ', { payload, sender });
  if (payload.payload && payload.payload.isRcLoggedIn !== undefined) {
    isRcLoggedIn = payload.payload.isRcLoggedIn;
    // Send update to all tabs, including the popup
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, {
            message: Messages.LOGIN_STATUS_UPDATE,
            payload: { isLcLoggedIn, isRcLoggedIn },
          });
        }
      });
    });
  }
};

const handleLcSendingData = (
  payload: MessageData,
  sender: chrome.runtime.MessageSender
) => {
  log('LC data', { payload, sender });
  if (rcTabId !== undefined) {
    chrome.tabs.sendMessage(rcTabId, payload);
    log('Forwarded LC_SENDING_DATA to RC tab', rcTabId);
  } else {
    log('RC tab ID not stored, cannot forward LC_SENDING_DATA');
  }
};

const handleLcDoneSendingData = (
  payload: MessageData,
  sender: chrome.runtime.MessageSender
) => {
  log('Done sending data, a cleanup call of sorts', { payload, sender });
  if (rcTabId !== undefined) {
    chrome.tabs.sendMessage(rcTabId, payload);
    log('Forwarded LC_DONE_SENDING_DATA to RC tab', rcTabId);
  } else {
    log('RC tab ID not stored, cannot forward LC_DONE_SENDING_DATA');
  }
};

const handleStartFetchRequest = (
  payload: MessageData,
  sender: chrome.runtime.MessageSender
) => {
  log('Received START_FETCH_REQUEST in background', { payload, sender });
  // Send the message to the LC tab if its ID is stored
  if (lcTabId !== undefined) {
    chrome.tabs.sendMessage(lcTabId, payload);
    log('Forwarded START_FETCH_REQUEST to LC tab', lcTabId);
  } else {
    log('LC tab ID not stored, cannot forward START_FETCH_REQUEST');
  }
};

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener(async (request: MessageData, sender) => {
  switch (request.message) {
    case Messages.LOGIN_STATUS_UPDATE:
      // The popup sends this to update the background script's state
      if (request.payload) {
        if (request.payload.isLcLoggedIn !== undefined) {
          isLcLoggedIn = request.payload.isLcLoggedIn;
        }
        if (request.payload.isRcLoggedIn !== undefined) {
          isRcLoggedIn = request.payload.isRcLoggedIn;
        }
      }
      // Then, broadcast the updated status to all tabs (including the popup itself)
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.id) {
            chrome.tabs.sendMessage(tab.id, {
              message: Messages.LOGIN_STATUS_UPDATE,
              payload: { isLcLoggedIn, isRcLoggedIn },
            });
          }
        });
      });
      break;
    case Messages.LC_SENDING_DATA:
      handleLcSendingData(request, sender);
      break;
    case Messages.LC_DONE_SENDING_DATA:
      handleLcDoneSendingData(request, sender);
      break;
    case Messages.START_FETCH_REQUEST:
      handleStartFetchRequest(request, sender);
      break;
    case Messages.OPEN_LC_LOGIN:
      log('Received OPEN_LC_LOGIN in background', { sender });
      if (lcTabId !== undefined) {
        chrome.tabs.update(lcTabId, {
          active: true,
          url: `${Config.LC_HOST}${Config.LC_LOGIN_PATH}`,
        });
      } else {
        log('LC tab ID not stored, cannot open LC login page');
      }
      break;
    case Messages.OPEN_RC_LOGIN:
      log('Received OPEN_RC_LOGIN in background', { sender });
      if (rcTabId !== undefined) {
        chrome.tabs.update(rcTabId, {
          active: true,
          url: `${Config.RC_HOST}${Config.RC_LOGIN_PATH}`,
        });
      } else {
        log('RC tab ID not stored, cannot open RC login page');
      }
      break;
    default:
      log('Unrecognized message type', { request, sender });
      break;
  }

  // TODO: Once the above are both logged in, we can then begin the sync!
  // We may want to store this in session storage.
  // Maybe store message data and tab id in session, so on click, we can cross reference that tabs still exist
  // TODO: Request Leetcode Submissions (Background --> LC Script)
  // Maybe need a way for popup UI to mark down that sync has begun, and not to close this window
  // TODO: Leetcode Submission Data (LC Script --> Background --> RC Script)
  // TODO: Leetcode Submission Done (LC Script --< Background --> RC Script)

  return true; // Indicate that the response will be sent asynchronously
});

// TODO: an on tab update listener to track if url changes (ie user successfully logs on to leetcode)
