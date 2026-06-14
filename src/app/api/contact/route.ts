import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      industry,
      goal,
      deployment,
      timeline,
      budget,
      website, // honeypot
      message, // legacy field support
    } = body ?? {};

    // Spam honeypot — silently accept and drop.
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const detail = goal || message;

    if (!name || !email || !detail) {
      return NextResponse.json(
        { error: 'Name, email, and a short description are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Messaging is temporarily unavailable. Please email us directly.' },
        { status: 503 }
      );
    }
    const resend = new Resend(apiKey);

    const rows: [string, string | undefined][] = [
      ['Name', name],
      ['Email', email],
      ['Company', company],
      ['Industry', industry],
      ['Preferred deployment', deployment],
      ['Timeline', timeline],
      ['Budget range', budget],
    ];

    const rowsHtml = rows
      .filter(([, value]) => value)
      .map(
        ([label, value]) =>
          `<p style="margin:4px 0;"><strong>${label}:</strong> ${escapeHtml(
            String(value)
          )}</p>`
      )
      .join('');

    const { data, error } = await resend.emails.send({
      from: 'Neqtex Contact Form <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'info@neqtex.com'],
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` — ${company}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color:#1a1a1a;">
          <h2 style="color:#8a6a3f;">New Neqtex inquiry</h2>
          <hr style="border:none; border-top:1px solid #eee;" />
          ${rowsHtml}
          <p style="margin:16px 0 4px;"><strong>What they want to improve:</strong></p>
          <div style="background:#f6f5f2; padding:14px; border-radius:8px; white-space:pre-wrap;">
            ${escapeHtml(String(detail)).replace(/\n/g, '<br>')}
          </div>
          <hr style="border:none; border-top:1px solid #eee; margin-top:20px;" />
          <p style="color:#888; font-size:12px;">Sent from the Neqtex contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: data?.id }, { status: 200 });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
