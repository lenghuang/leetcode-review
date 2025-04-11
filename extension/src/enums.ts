export enum Messages {
  START_FETCH_REQUEST = 'LeetcodeStartFetchingRequest',
  LC_SENDING_DATA = 'LeetcodeSendingData',
  LC_DONE_SENDING_DATA = 'LeetcodeDoneSendingData',
  // One way because we just send a message on page load. Maybe add an "ack" for this so we can display "Connected and waiting" UI
  RC_IS_LOGGED_IN_NOTIFICATION = 'RecodeIsLoggedInNotification',
  LC_IS_LOGGED_IN_NOTIFICATION = 'LeetcodeIsLoggedInNotification',
}

export interface MessageData {
  message: Messages;
  data: any;
}
