export enum Messages {
  LC_SENDING_DATA = 'LeetcodeSendingData',
  LC_DONE_SENDING_DATA = 'LeetcodeDoneSendingData',
  RC_IS_LOGGED_IN_NOTIFICATION = 'RecodeIsLoggedInNotification', // One way because we just send a message on page load. Maybe add an "ack" for this so we can display "Connected and waiting" UI
  LC_IS_LOGGED_IN_REQUEST = 'LeetcodeIsLoggedInRequest',
  LC_IS_LOGGED_IN_RESPONSE = 'LeetcodeIsLoggedInResponse',
}

export interface MessageData {
  message: Messages;
  data: any;
}
