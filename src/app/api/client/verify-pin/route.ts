import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pin } = body ?? {};

    if (!pin || typeof pin !== 'string') {
      return NextResponse.json({ error: 'PIN is required' }, { status: 400 });
    }

    const expectedPin = process.env.CLIENT_PIN;
    if (!expectedPin) {
      console.error('CLIENT_PIN is not configured');
      return NextResponse.json(
        { error: 'Client portal is not configured' },
        { status: 503 }
      );
    }

    if (pin !== expectedPin) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Client PIN verification error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
