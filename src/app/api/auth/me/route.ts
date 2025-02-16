import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get tokens from cookies
    const accessToken = request.cookies.get('accessToken')?.value;

    // Forward credentials to external API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    // Get response data
    const data = await response.json();

    if (!response.ok) {
      if (data.message === 'Invalid/Expired Token!') {
        request.cookies.delete('accessToken');
        request.cookies.delete('refreshToken');
      }
      return NextResponse.json(data, { status: response.status });
    }

    const newResponse = NextResponse.json(data, { status: 200 });

    return newResponse;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    );
  }
}
