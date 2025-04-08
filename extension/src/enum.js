'use strict';

export const Messages = {
  START_FETCH: 'StartFetchingLeetcodeSubmissions',
  LC_DATA: 'LeetcodeSubmissionData',
  DONE_FETCH: 'DoneFetchingLeetcodeData',
};

export const PopupConfig = {
  DEV_MODE: true,
  LEETCODE_DOMAIN: 'leetcode.com',
  RECODE_LOGIN_PATH: '/sign-in?isExtension=true',
  RECODE_SYNCING_PATH: '/protected/syncing',
  RECODE_HOST_DEV: 'http://localhost:3000', // dev
  RECODE_HOST_PROD: 'https://leetcode-review.vercel.app', // prod
};
