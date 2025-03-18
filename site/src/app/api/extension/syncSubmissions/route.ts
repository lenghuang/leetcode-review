import { ChromeExtensionSyncSubmissionsType } from '@/types/zod.types';
import { ChromeExtensionSyncSubmissions } from '@/zod/chrome_extension_sync_submissions';
import { NextResponse } from 'next/server';

// api/extension/syncSubmissions
export async function POST(req: Request) {
  req
    .json()
    .then((requestData) => {
      const { success, error, data } =
        ChromeExtensionSyncSubmissions.safeParse(requestData);

      if (error || !success || !data) {
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
      }

      return syncSubmissions(data)
        .then((message) => {
          const response = NextResponse.json(message);
          response.headers.set(
            'Access-Control-Allow-Origin',
            'https://leetcode.com'
          );
          return response;
        })
        .catch((error) => NextResponse.json({ error }, { status: 500 }));
    })
    .catch((error) => NextResponse.json({ error }, { status: 400 }));
}

// Separate logic from network layer
const syncSubmissions = async (data: ChromeExtensionSyncSubmissionsType) => {
  const submissions = data.submissions;
  const totalSubmissions = submissions.submissions_dump.length;
  const acceptedSubmissions = submissions.submissions_dump.filter(
    (s) => s.status === 10
  )?.length;
  const message = `Received ${totalSubmissions} total submissions, ${acceptedSubmissions} of which are accepted`;
  return message;
};
