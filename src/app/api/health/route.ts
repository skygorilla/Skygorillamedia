import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      firebase: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      recaptcha: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    };
    
    return NextResponse.json(health);
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Health check failed' },
      { status: 500 }
    );
  }
}