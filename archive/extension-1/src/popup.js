'use strict';

import { PopupConfig } from './enum';
import { getActiveTab, isLeetCodeDomain, getRecodeHost } from './utils';

const showStatus = (message) => {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.style.display = 'block';
};

const openRecodeLoginTab = async () => {
  // Get current active tab's position
  const activeTab = await getActiveTab();
  if (activeTab) {
    // Create new tab with adjacent positioning
    await chrome.tabs.create({
      url: `${getRecodeHost()}${PopupConfig.RECODE_LOGIN_PATH}`,
      index: activeTab.index + 1, // Position immediately to the right
      openerTabId: activeTab.id, // Maintain tab relationship
    });
  } else {
    await chrome.tabs.create({
      url: `${getRecodeHost()}${PopupConfig.RECODE_LOGIN_PATH}`,
    });
  }
};

const getRecodeSyncTab = async () => {
  const [tab] = await chrome.tabs.query({
    url: `${getRecodeHost()}${PopupConfig.RECODE_SYNCING_PATH}`,
  });
  return tab;
};

const isRecodeSyncTabOpen = async () => {
  const tab = await getRecodeSyncTab();
  return !!tab;
};

const goToRecodeSyncTab = async () => {
  const tab = await getRecodeSyncTab();
  chrome.tabs.update(tab.id, { active: true });
  chrome.tabs.highlight({ tabs: tab.id });
};

// should all local storage setters/getters go in one place? and all the tab stuff another?

const storeLastFetchTime = async () => {
  chrome.storage.local.set({ lastFetchTime: Date.now() });
};

const checkLastFetchTime = async () => {
  return new Promise((resolve) => {
    chrome.storage.local.get('lastFetchTime', (data) => {
      resolve(data?.lastFetchTime);
    });
  });
};

//#endregion

document.addEventListener('DOMContentLoaded', async () => {
  // Get references to HTML elements
  const fetchButton = document.getElementById('fetchData');
  const loginButton = document.getElementById('loginButton');
  const mainContent = document.getElementById('mainContent');
  const loggedInContent = document.getElementById('loggedInContent');
  const loggedOutContent = document.getElementById('loggedOutContent');

  // Disable button if not on LeetCode
  if (!(await isLeetCodeDomain())) {
    showStatus('This extension only works on LeetCode.');
    return;
  }

  // Display content based on user's login
  mainContent.style.display = 'block';
  if (await isRecodeSyncTabOpen()) {
    loggedInContent.style.display = 'block';
    fetchButton.addEventListener('click', async () => {
      goToRecodeSyncTab();
      // TODO:  Keep this around as a nice lil UI
      storeLastFetchTime();
    });
  } else {
    loggedOutContent.style.display = 'block';

    // Attach the listener to the button
    loginButton.addEventListener('click', async () => {
      openRecodeLoginTab();
    });
  }
});
