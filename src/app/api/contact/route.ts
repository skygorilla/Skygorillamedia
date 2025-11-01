import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
  subject: z.string().min(5).max(200).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, subject } = contactSchema.parse(body);
    
    // Log contact submission (replace with email service)
    console.log(JSON.stringify({
      type: 'contact_submission',
      name: name.replace(/[<>\"'&]/g, ''),
      email: email.replace(/[<>\"'&]/g, ''),
      subject: subject?.replace(/[<>\"'&]/g, ''),
      message: message.substring(0, 200),
      timestamp: new Date().toISOString(),
      ip: request.ip || 'unknown'
    }));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Poruka je uspješno poslana' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Neispravni podaci' },
      { status: 400 }
    );
  }
}