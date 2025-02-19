import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const refreshTokenExpiry = request.cookies.get('refreshTokenExpiry')?.value;
    const newTokens: { accessToken: string; refreshToken: string } = {
      accessToken: '',
      refreshToken: '',
    };

    // Use the handleApiRequest utility
    let authResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (authResponse.status === 401) {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken, expiresInMins: 1 }),
        },
      );
      const data = await refreshResponse.json();
      newTokens.accessToken = data.accessToken;
      newTokens.refreshToken = data.refreshToken;
      if (refreshResponse.ok) {
        authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          },
        );
      }
    }

    const data = await authResponse.json();

    if (!authResponse.ok) {
      return NextResponse.json(data, { status: authResponse.status });
    }

    const newResponse = NextResponse.json(data, { status: 200 });

    if (newTokens.accessToken)
      newResponse.cookies.set({
        name: 'accessToken',
        value: newTokens.accessToken,
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 30, // 30 minutes
        sameSite: 'lax',
      });

    const expiresInMins = 604800; // 1 week
    const value = refreshTokenExpiry
      ? new Date(refreshTokenExpiry).toISOString()
      : new Date(Date.now() + expiresInMins * 1000).toISOString();
    const maxAge = refreshTokenExpiry
      ? Math.floor((new Date(refreshTokenExpiry).getTime() - Date.now()) / 1000)
      : expiresInMins;

    if (newTokens.refreshToken) {
      newResponse.cookies.set({
        name: 'refreshToken',
        value: newTokens.refreshToken,
        httpOnly: true,
        secure: true,
        path: '/',
        // maxAge: 604800, // 1 week
        maxAge, // 1 week
        sameSite: 'lax',
      });
      newResponse.cookies.set({
        name: 'refreshTokenExpiry',
        value,
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge, // 1 week
        sameSite: 'lax',
      });
    }

    return newResponse;
  } catch (error) {
    console.error('Me endpoint error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    );
  }
}
