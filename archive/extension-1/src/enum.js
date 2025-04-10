'use strict';

export const Messages = {
  // Fetch and Sync Messages
  START_FETCH: 'StartFetchingLeetcodeSubmissions',
  START_FETCH_ACK: 'StartFetchingLeetcodeSubmissionsAcknowledged',
  LC_DATA: 'LeetcodeSubmissionData',
  DONE_FETCH: 'DoneFetchingLeetcodeData',

  // Error Handling
  FETCH_ERROR: 'FetchError',
};

export const ErrorCodes = {
  NETWORK_ERROR: 'NetworkError',
  INJECTION_ERROR: 'ScriptInjectionError',
  COMMUNICATION_ERROR: 'CommunicationError',
};

export const PopupConfig = {
  DEV_MODE: true,
  LEETCODE_DOMAIN: 'leetcode.com',
  RECODE_LOGIN_PATH: '/sign-in?isExtension=true',
  RECODE_SYNCING_PATH: '/protected/syncing',
  RECODE_HOST_DEV: 'http://localhost:3000', // dev
  RECODE_HOST_PROD: 'https://leetcode-review.vercel.app', // prod
};
