import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Your API logic here (e.g., fetching data from a database)
  const data = { message: 'Hello from API route!', request };
  return NextResponse.json(data);
}
