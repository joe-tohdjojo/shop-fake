import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log(`@JT ~ GET ~ GET: CHICKEN CHICKEN`);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/categories`,
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

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    );
  }
}
