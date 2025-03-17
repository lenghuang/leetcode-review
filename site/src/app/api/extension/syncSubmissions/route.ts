import { ChromeExtensionSyncSubmissions } from '@/zod/chrome_extension_sync_submissions';
import { NextResponse } from 'next/server';

// api/extension/syncSubmissions
export async function POST(req: Request) {
  try {
    const requestData = await req.json();

    const { success, error, data } =
      ChromeExtensionSyncSubmissions.safeParse(requestData);

    if (error || !success || !data) {
      // TODO: Better status code / error handling
      return;
    }

    const submissions = data.submissions;
    const totalSubmissions = submissions.submissions_dump.length;
    const acceptedSubmissions = submissions.submissions_dump.filter(
      (s) => s.status === 10
    )?.length;

    const message = `Received ${totalSubmissions} total submissions, ${acceptedSubmissions} of which are accepted`;
    const response = NextResponse.json(message);
    response.headers.set('Access-Control-Allow-Origin', 'https://leetcode.com');
    return response;
  } catch (err) {
    // TODO: Better status code / error handling
    console.error('api/extension/syncSubmissions', err);
  }
}
