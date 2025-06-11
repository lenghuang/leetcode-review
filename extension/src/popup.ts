'use strict';

import './popup.css';

import { Messages } from './enums';

(function () {
  const SYNC_RATE_LIMIT_MS = 3 * 60 * 1000; // 3 minutes

  const startSyncButton = document.getElementById(
    'startSyncBtn'
  ) as HTMLButtonElement | null;

  if (startSyncButton) {
    const updateButtonState = async () => {
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

    startSyncButton.addEventListener('click', async () => {
      startSyncButton.disabled = true;
      startSyncButton.textContent = 'Syncing...';

      const now = Date.now();
      await chrome.storage.local.set({ lastSyncTimestamp: now });

      chrome.runtime.sendMessage({ message: Messages.START_FETCH_REQUEST });

      // // Re-enable button after rate limit duration
      // setTimeout(updateButtonState, SYNC_RATE_LIMIT_MS);
    });

    // Update button state when popup is opened
    // document.addEventListener('DOMContentLoaded', updateButtonState);
  }
})();
