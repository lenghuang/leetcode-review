// site/src/app/syncing/page.tsx
'use client';

import { BrowseHeader } from '@/components/typography/browse-header';
import { useEffect, useState } from 'react';

export const Messages = {
  START_FETCH: 'StartFetchingLeetcodeSubmissions',
  LC_DATA: 'LeetcodeSubmissionData',
  DONE_FETCH: 'DoneFetchingLeetcodeData',
};

export default function SyncingPage() {
  const [messages, setMessages] = useState('');

  useEffect(() => {
    // Send a message to the background script when the page is ready.
    window.postMessage({ message: Messages.START_FETCH }, '*');

    // Listen to new
    window.addEventListener(
      'message',
      (event) => {
        console.log(event);
        setMessages(JSON.stringify(event, null, 0));
      },
      false
    );
  }, []);

  return (
    <div className="flex flex-col gap-16">
      <BrowseHeader>Syncing...</BrowseHeader>
      <p className="text-foreground">
        Please wait while your data is being synced.
      </p>
      <pre
        className="text-xs font-mono p-3 rounded border max-h-[40vh] w-full max-w-[80vw]
          overflow-auto"
      >
        {messages}
      </pre>
    </div>
  );
}
