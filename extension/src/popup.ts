'use strict';

import './popup.css';

import { Messages, MessageData } from './enums';

(function () {
  const SYNC_RATE_LIMIT_MS = 3 * 60 * 1000; // 3 minutes

  let isLcLoggedIn = false;
  let isRcLoggedIn = false;

  const lcStatusElement = document.getElementById('lcStatus');
  const rcStatusElement = document.getElementById('rcStatus');
  const lcLoginBtn = document.getElementById(
    'lcLoginBtn'
  ) as HTMLButtonElement | null;
  const rcLoginBtn = document.getElementById(
    'rcLoginBtn'
  ) as HTMLButtonElement | null;
  const startSyncButton = document.getElementById(
    'startSyncBtn'
  ) as HTMLButtonElement | null;

  const updateUI = () => {
    if (lcStatusElement) {
      lcStatusElement.textContent = `LeetCode Status: ${
        isLcLoggedIn ? 'Logged In' : 'Logged Out'
      }`;
    }
    if (rcStatusElement) {
      rcStatusElement.textContent = `Recode AI Status: ${
        isRcLoggedIn ? 'Logged In' : 'Logged Out'
      }`;
    }

    if (lcLoginBtn) {
      lcLoginBtn.style.display = isLcLoggedIn ? 'none' : 'inline-block';
    }
    if (rcLoginBtn) {
      rcLoginBtn.style.display = isRcLoggedIn ? 'none' : 'inline-block';
    }

    if (startSyncButton) {
      const canSync = isLcLoggedIn && isRcLoggedIn;
      startSyncButton.style.display = canSync ? 'inline-block' : 'none';
      startSyncButton.disabled = !canSync; // Initially disable if not logged in to both
      if (canSync) {
        updateButtonState(); // Check rate limit only if logged in to both
      }
    }
  };

  const updateButtonState = async () => {
    if (!startSyncButton) return;

    const result = await chrome.storage.local.get(['lastSyncTimestamp']);
    const lastSyncTimestamp = result.lastSyncTimestamp || 0;
    const now = Date.now();
    const timeSinceLastSync = now - lastSyncTimestamp;

    if (timeSinceLastSync < SYNC_RATE_LIMIT_MS) {
      startSyncButton.disabled = true;
      const remainingTime = SYNC_RATE_LIMIT_MS - timeSinceLastSync;
      const minutes = Math.ceil(remainingTime / 60000);
      startSyncButton.textContent = `Syncing available in ${minutes} min`;
    } else {
      startSyncButton.disabled = false;
      startSyncButton.textContent = 'Start Syncing';
    }
  };

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(
    (request: MessageData, sender, sendResponse) => {
      if (request.message === Messages.LC_IS_LOGGED_IN_NOTIFICATION) {
        isLcLoggedIn = true;
      }
      if (request.message === Messages.RC_IS_LOGGED_IN_NOTIFICATION) {
        isRcLoggedIn = true;
      }
      if (isLcLoggedIn && isRcLoggedIn) {
        updateUI();
      }
    }
  );

  if (lcLoginBtn) {
    lcLoginBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ message: Messages.OPEN_LC_LOGIN });
    });
  }

  if (rcLoginBtn) {
    rcLoginBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ message: Messages.OPEN_RC_LOGIN });
    });
  }

  if (startSyncButton) {
    startSyncButton.addEventListener('click', async () => {
      if (!isLcLoggedIn || !isRcLoggedIn) {
        // Should not happen if button is disabled, but as a safeguard
        console.warn(
          'Attempted to start sync while not logged in to both platforms.'
        );
        return;
      }

      startSyncButton.disabled = true;
      startSyncButton.textContent = 'Syncing...';

      const now = Date.now();
      await chrome.storage.local.set({ lastSyncTimestamp: now });

      chrome.runtime.sendMessage({ message: Messages.START_FETCH_REQUEST });

      // Re-enable button after rate limit duration
      setTimeout(updateButtonState, SYNC_RATE_LIMIT_MS);
    });
  }
})();
