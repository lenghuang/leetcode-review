'use client';

import { BrowseHeader } from '@/components/typography/browse-header';
import { useEffect, useState } from 'react';

// Enum for messages to ensure type safety
export enum Messages {
  LC_SENDING_DATA = 'LeetcodeSendingData',
  LC_DONE_SENDING_DATA = 'LeetcodeDoneSendingData',
  RC_IS_LOGGED_IN_NOTIFICATION = 'RecodeIsLoggedInNotification', // One way because we just send a message on page load. Maybe add an "ack" for this so we can display "Connected and waiting" UI
  LC_IS_LOGGED_IN_REQUEST = 'LeetcodeIsLoggedInRequest',
  LC_IS_LOGGED_IN_RESPONSE = 'LeetcodeIsLoggedInResponse',
}

export default function SyncingPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [syncStatus, setSyncStatus] = useState<
    'idle' | 'fetching' | 'success' | 'error'
  >('idle');
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    // Send a message to the background script when the page is ready
    window.postMessage({ message: Messages.RC_IS_LOGGED_IN_NOTIFICATION }, '*');

    // Listen to new messages
    const messageHandler = (event: MessageEvent) => {
      const { message, data } = event.data;

      // Handle different message types
      switch (message) {
        case Messages.LC_DONE_SENDING_DATA:
          // Log all incoming messages for debugging
          console.log('Received message:', { message, data });

          // Update messages state with new message
          setMessages((prev) => [
            ...prev,
            `[${new Date().toISOString()}] ${message}: ${JSON.stringify(data)}`,
          ]);
          break;
        case Messages.LC_SENDING_DATA:
          // Log all incoming messages for debugging
          console.log('Received message:', { message, data });
          // Update messages state with new message
          setMessages((prev) => [
            ...prev,
            `[${new Date().toISOString()}] ${message}: ${JSON.stringify(data)}`,
          ]);
          break;
      }
    };

    window.addEventListener('message', messageHandler);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  // Render sync status and messages
  const renderStatusMessage = () => {
    switch (syncStatus) {
      case 'idle':
        return 'Initializing sync...';
      case 'fetching':
        return 'Fetching LeetCode submissions...';
      case 'success':
        return 'Sync completed successfully!';
      case 'error':
        return 'An error occurred during sync.';
    }
  };

  return (
    <div className="flex flex-col gap-16">
      <BrowseHeader>Syncing LeetCode Submissions</BrowseHeader>

      <div className="text-center">
        <p
          className={`text-foreground mb-4 ${syncStatus === 'success' ? 'text-green-600' : ''}
            ${syncStatus === 'error' ? 'text-red-500' : ''} `}
        >
          {renderStatusMessage()}
        </p>

        {syncStatus === 'error' && errorDetails && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
            <p className="text-red-700 font-medium">Error Details:</p>
            <pre className="text-xs text-red-600 mt-2 overflow-x-auto">
              {errorDetails}
            </pre>
          </div>
        )}

        {messages.length > 0 && (
          <div className="mt-6 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-2">Sync Log</h3>
            <pre className="text-xs font-mono text-left max-h-[40vh] overflow-auto">
              {messages.map((msg, index) => (
                <div key={index} className="mb-1">
                  {msg}
                </div>
              ))}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
