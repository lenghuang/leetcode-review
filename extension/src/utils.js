import { Messages, Sources, PopupConfig } from './enum';

export const isValidMessage = (type) => Object.values(Messages).includes(type);
export const isValidSource = (src) => Object.values(Sources).includes(src);

export const getActiveTab = async () => {
  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return activeTab;
};

export const isLeetCodeDomain = async () => {
  const activeTab = await getActiveTab();
  const url = activeTab?.url || '';
  return url.includes(PopupConfig.LEETCODE_DOMAIN);
};

// export const getLeetCodeTabs = async () =>
//   await chrome.tabs.query({
//     url: ['*://*.leetcode.com/*', '*://leetcode.com/*'],
//   });

export const getRecodeHost = () =>
  PopupConfig.DEV_MODE
    ? PopupConfig.RECODE_HOST_DEV
    : PopupConfig.RECODE_HOST_PROD;
