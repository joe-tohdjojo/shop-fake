import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();

    // Forward credentials to external API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );

    // Get response data
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // Create response with user data (excluding tokens)
    const { accessToken, refreshToken, ...userData } = data;
    const newResponse = NextResponse.json(userData, { status: 200 });

    // Set HttpOnly cookies
    newResponse.cookies.set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 60 * 30, // 30 minutes
      sameSite: 'lax',
    });

    newResponse.cookies.set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 604800, // 1 week
      sameSite: 'lax',
    });

    return newResponse;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    );
  }
}
