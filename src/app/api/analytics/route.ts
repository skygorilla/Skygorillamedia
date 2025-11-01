import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const analyticsSchema = z.object({
  event: z.string().min(1).max(50),
  page: z.string().min(1).max(200),
  data: z.record(z.any()).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, page, data } = analyticsSchema.parse(body);
    
    // Log analytics event
    console.log(JSON.stringify({
      type: 'analytics_event',
      event: event.replace(/[<>\"'&]/g, ''),
      page: page.replace(/[<>\"'&]/g, ''),
      data: data ? JSON.stringify(data).substring(0, 500) : undefined,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent')?.substring(0, 200),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    }));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid data' },
      { status: 400 }
    );
  }
}