// content_script.ts

import { Messages } from './enums';

// Define a type for the data being sent in messages
interface MessageData {
  message: Messages;
  data?: any;
}

// --- Module: Logging ---
const loggingModule = {
  log: (...args: any[]): void => {
    // TODO: Implement Logging module. The current implementation uses console.log
  },
};

// --- Module: Message Handling (To Background Script) ---
const backgroundMessageHandler = {
  sendMessageToBackground: async (
    message: Messages,
    data?: any
  ): Promise<void> => {
    // TODO: Implement Sending messages to background script
  },
};

// --- Module: Recode Uploading ---
const recodeUploader = {
  uploadSubmissions: async (submissions: any): Promise<void> => {
    // TODO: Implement uploading of submission to Recode endpoint
  },
};

// --- Module: Message Handling (To Window) ---
const windowMessageHandler = {
  postMessageToWindow: (message: Messages, data?: any): void => {
    // TODO: Implement posting message to window
  },
};

// --- Event Listener for Window Messages ---
window.addEventListener(
  'message',
  async (event: MessageEvent): Promise<void> => {
    // TODO: Validate the origin
    // TODO: Ensure data exists and is not empty

    const { message, data } = event.data as MessageData;

    // Dispatch based on message type
    switch (message) {
      case Messages.START_FETCH:
        // TODO: Handle START_FETCH message
        break;
      // Add more cases as needed
    }
  }
);

// --- Event Listener for Chrome Runtime Messages ---
chrome.runtime.onMessage.addListener(
  async ({ message, data }, sender, sendResponse?) => {
    // Dispatch based on message type
    switch (message) {
      // TODO: Handle LC_DATA, LC DONE

      // Ignore below case

      case Messages.START_FETCH_ACK:
        // TODO: Handle START_FETCH_ACK message
        break;
      case Messages.LC_DATA:
        // TODO: Handle LC_DATA message
        break;
      // Add more cases as needed
    }
  }
);

window.addEventListener('message', async (event) => {
  if (event.origin !== window.location.origin) {
    return;
  }

  // TODO: this is the layer between my site and my background code.
  // just need to forward LC_DATA and DOne
});
