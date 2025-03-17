import { NextResponse } from 'next/server';

// api/extension/syncSubmissions
export async function POST(req: Request) {
  const { submissions } = await req.json();

  return syncSubmissions(submissions)
    .then((data) => {
      const response = NextResponse.json(data);
      response.headers.set(
        'Access-Control-Allow-Origin',
        'https://leetcode.com'
      );
      return response;
    })
    .catch((err) => console.error('api/extension/syncSubmissions', err));
}

// Separate logic from network layer
async function syncSubmissions(submissions: any) {
  const totalSubmissions = submissions?.submissions_dump?.length;
  const acceptedSubmissions = submissions?.submissions_dump?.filter(
    (s: any) => s?.status === 10
  )?.length;
  return `Received ${totalSubmissions} total submissions, ${acceptedSubmissions} of which are accepted.`;
}
