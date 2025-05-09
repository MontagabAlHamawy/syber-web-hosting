import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch('https://api.country.is', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      cache: 'no-store'
    });

    if (!res.ok) throw new Error('Failed to fetch');

    const data = await res.json();
    return NextResponse.json(data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error in /api/ipinfo:', error.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
