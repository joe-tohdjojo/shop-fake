import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const newResponse = NextResponse.json({}, { status: 200 });

    newResponse.cookies.delete('accessToken');
    newResponse.cookies.delete('refreshToken');

    return newResponse;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
