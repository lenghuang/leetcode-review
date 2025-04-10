'use strict';

import { Messages, ErrorCodes } from './enum';

const prefixedLog = (...args) => {
  console.log('[Leetcode Content Script]', ...args);
};

const checkLeetcodeLoginStatus = async () => {
  try {
    const response = await fetch('https://leetcode.com/accounts/login/', {
      method: 'GET',
      credentials: 'include', // Important to send cookies
      redirect: 'manual', // Prevent automatic redirects
    });

    // LeetCode uses 302 for logged-in users, 200 for logged-out
    const isLoggedIn = response.status === 302;

    prefixedLog('Login Status Check:', isLoggedIn ? 'Logged In' : 'Logged Out');

    return isLoggedIn;
  } catch (error) {
    prefixedLog('Login status check failed', error);
    return false;
  }
};

const fetchSubmissionsFromLeetcode = () => {
  // TODO: Implement actual fetch logic
  prefixedLog('Fetching submissions from LeetCode');

  // Simulated fetch - replace with actual implementation
  try {
    const mockSubmissions1 = [
      { id: 1, problem: 'Two Sum', status: 'Accepted' },
      { id: 2, problem: 'Add Two Numbers', status: 'Accepted' },
    ];

    const mockSubmissions2 = [
      { id: 3, problem: 'Median of Two Sorted Arrays', status: 'Accepted' },
      { id: 4, problem: 'Longest Increasing Subsequence', status: 'Accepted' },
    ];

    const mockSubmissions3 = [
      { id: 5, problem: 'Jump Game', status: 'Accepted' },
      { id: 6, problem: 'Trapping Rain Water', status: 'Accepted' },
    ];

    // Send submissions back to the extension
    chrome.runtime.sendMessage({
      message: Messages.LC_DATA,
      data: mockSubmissions1,
    });

    chrome.runtime.sendMessage({
      message: Messages.LC_DATA,
      data: mockSubmissions2,
    });

    chrome.runtime.sendMessage({
      message: Messages.LC_DATA,
      data: mockSubmissions3,
    });
  } catch (error) {
    prefixedLog('Submission fetch failed', error);

    chrome.runtime.sendMessage({
      message: Messages.FETCH_ERROR,
      data: {
        code: ErrorCodes.NETWORK_ERROR,
        source: 'LeetCode',
        errorMessage: error.message,
      },
    });
  }
};

// Listen to messages from chrome runtime, aka, the extension's background.js
chrome.runtime.onMessage.addListener(
  async ({ message, data }, sender, sendResponse) => {
    if (message === Messages.START_FETCH) {
      prefixedLog(
        'Received start message from runtime, sending that data back',
        {
          message,
          data,
        }
      );

      // Acknowledge start of fetch
      await chrome.runtime.sendMessage({
        message: Messages.START_FETCH_ACK,
      });

      // Trigger submissions fetch
      fetchSubmissionsFromLeetcode();
    } else if (message === Messages.CHECK_LOGIN_STATUS) {
      try {
        const isLoggedIn = await checkLeetcodeLoginStatus();

        // Send login status back to the sender
        chrome.runtime.sendMessage({
          message: Messages.LOGIN_STATUS_RESPONSE,
          data: { isLoggedIn },
        });
      } catch (error) {
        prefixedLog('Login status check failed', error);

        chrome.runtime.sendMessage({
          message: Messages.FETCH_ERROR,
          data: {
            code: ErrorCodes.NETWORK_ERROR,
            source: 'LeetCode Content Script',
            errorMessage: 'Failed to check login status',
          },
        });
      }
    } else {
      prefixedLog('Invalid message received');

      chrome.runtime.sendMessage({
        message: Messages.FETCH_ERROR,
        data: {
          code: ErrorCodes.COMMUNICATION_ERROR,
          source: 'LeetCode Content Script',
          errorMessage: 'Invalid message format',
        },
      });
    }
  }
);

// Listen for messages from the window object and forward them to the background.js
window.addEventListener('message', (event) => {
  // Optional: Check the origin of the message if necessary
  if (event.origin !== window.location.origin) {
    prefixedLog('Possible cross-site scripting attack!');
    return;
  }
});
