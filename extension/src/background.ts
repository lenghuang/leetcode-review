// src/background.ts
'use strict';

import { Config } from './config';
import { createTabInWindow } from './chromeUtils';

/**
 * Handles the 'GREETINGS' message.
 * @param request The message request.
 * @param sender The sender of the message.
 * @param sendResponse The function to send a response.
 */
const handleGreetings = (
  request: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => {
  const message: string = `Hi ${
    sender.tab ? 'Con' : 'Pop'
  }, my name is Bac. I am from Background. It's great to hear from you.`;

  // Log message coming from the `request` parameter
  console.log(request.payload.message);
  // Send a response message
  sendResponse({
    message,
  });
};

/**
 * Opens a new window with popup.html and two additional tabs.
 * @param activeTab The active tab information (passed from chrome.action.onClicked).
 */
const openPopupWithAdditionalTabs = (activeTab: chrome.tabs.Tab) => {
  chrome.windows.create(
    {
      url: chrome.runtime.getURL('popup.html'),
      height: 500,
      width: 500,
      type: 'normal', // Specify the window type for better consistency
    },
    (window) => {
      // After the window is created, open two more tabs within the same window
      // Check if the window was successfully created and has an ID
      if (window && window.id) {
        console.log(window);
        // Create a new tab in the created window for the LC Login
        createTabInWindow(
          window.id,
          `${Config.LC_HOST}${Config.LC_LOGIN_PATH}`
        );
        // TODO: Do we want to load in content scripts here? Do we need to figure out if it's been loaded and store that?
        // Create another new tab in the created window for the RC Login
        createTabInWindow(
          window.id,
          `${Config.RC_HOST}${Config.RC_LOGIN_PATH}`
        );
      } else {
        // Handle the error case where the window was not created or the ID is missing
        console.error('Failed to create window or window ID is missing.');
      }
    }
  );
};

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handle greeting messages
  if (request.type === 'GREETINGS') {
    handleGreetings(request, sender, sendResponse);
  }

  // TODO: Request Leetcode Logged In (Popup --> Background --> LC Script)

  // TODO: Leetcode Logged In Data (LC Script --> Background --> Popup)

  // TODO: Request Recode Logged In (Popup --> Background --> RC Script)

  // TODO: Recode Logged In Data (RC Script --> Background --> Popup)

  // TODO: Once the above are both logged in, we can then begin the sync!
  // We may want to store this in session storage.
  // Maybe store message data and tab id in session, so on click, we can cross reference that tabs still exist

  // TODO: Request Leetcode Submissions (Background --> LC Script)
  // Maybe need a way for popup UI to mark down that sync has begun, and not to close this window

  // TODO: Leetcode Submission Data (LC Script --> Background --> RC Script)

  // TODO: Leetcode Submission Done (LC Script --< Background --> RC Script)

  return true; // Indicate that the response will be sent asynchronously
});

// Listen for when the extension icon is clicked
chrome.action.onClicked.addListener((activeTab: chrome.tabs.Tab) => {
  openPopupWithAdditionalTabs(activeTab);
  // TODO: other initialise things
});
