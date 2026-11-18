import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Optional Google Apps Script web app (see scripts/google-apps-script/inquiries.gs).
 * When INQUIRY_WEBHOOK_URL is set, every inquiry is also added as a row to the
 * "DeepDivers website inquiries" Google Sheet and the client gets an automatic
 * confirmation email from teamdeepdivers@gmail.com.
 */
const WEBHOOK_URL = process.env.INQUIRY_WEBHOOK_URL;
const WEBHOOK_SECRET = process.env.INQUIRY_WEBHOOK_SECRET;

/** Escapes user input before it goes into the notification email's HTML */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface Inquiry {
  name: string;
  email: string;
  service: string;
  budget: string;
  paymentStructure: string;
  timeline: string;
  message: string;
  attachmentName: string;
}

/** Sends the inquiry to the Google Sheet webhook. Returns true when it was stored. */
async function sendToWebhook(inquiry: Inquiry, emailNotificationSent: boolean): Promise<boolean> {
  if (!WEBHOOK_URL) return false;
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: WEBHOOK_SECRET ?? '',
        ...inquiry,
        emailNotificationSent,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return false;
    const result = await response.json().catch(() => null);
    return Boolean(result && result.ok);
  } catch (error) {
    console.error('Inquiry webhook error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Spam trap: real visitors never see or fill this field
    if (String(formData.get('website') || '').trim()) {
      return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });
    }

    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const budget = String(formData.get('budget') || '').trim();
    const paymentStructure = String(formData.get('paymentStructure') || '').trim();
    const timeline = String(formData.get('timeline') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const file = formData.get('attachment') as File | null;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Prepare attachment if file is uploaded (max 4MB due to Vercel serverless limit)
    let attachments: { filename: string; content: Buffer }[] = [];

    if (file && file.size > 0) {
      // Check file size (4MB limit for Vercel serverless functions)
      if (file.size > 4 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'File size exceeds 4MB. Please share larger files via Google Drive or Dropbox link in your message.' },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      attachments = [
        {
          filename: file.name,
          content: buffer,
        },
      ];
    }

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      service: escapeHtml(service),
      budget: escapeHtml(budget || 'Not specified'),
      paymentStructure: escapeHtml(paymentStructure || 'Not specified'),
      timeline: escapeHtml(timeline || 'Not specified'),
      message: escapeHtml(message),
      attachment: file && file.size > 0
        ? `${escapeHtml(file.name)} (${(file.size / 1024 / 1024).toFixed(2)} MB)`
        : 'No attachment',
    };

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: 'DeepDivers Portfolio <onboarding@resend.dev>', // Will be replaced with your domain after verification
      to: ['teamdeepdivers@gmail.com'],
      replyTo: email,
      subject: `New Quote Request: ${service} - from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            Team DeepDivers
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 12px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold; width: 150px;">
                👤 Name
              </td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">
                ${safe.name}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                📧 Email
              </td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">
                <a href="mailto:${safe.email}" style="color: #3b82f6;">${safe.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                🎯 Service
              </td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">
                ${safe.service}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                💰 Budget
              </td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">
                ${safe.budget}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                💳 Payment Structure
              </td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">
                ${safe.paymentStructure}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                ⏱️ Timeline
              </td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">
                ${safe.timeline}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                📎 Attachment
              </td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">
                ${safe.attachment}
              </td>
            </tr>
          </table>

          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">📝 Project Details:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #4b5563;">${safe.message}</p>
          </div>

          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px; text-align: center;">
            This message was sent from the DeepDivers Portfolio contact form.
          </p>
        </div>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error('Resend error:', error);
    }

    // Log to the Google Sheet and send the client's confirmation (when configured).
    // If the Resend email failed, the webhook also emails the team as a backup.
    const storedInSheet = await sendToWebhook(
      {
        name,
        email,
        service,
        budget,
        paymentStructure,
        timeline,
        message,
        attachmentName: file && file.size > 0 ? file.name : '',
      },
      !error
    );

    if (error && !storedInSheet) {
      return NextResponse.json(
        { error: 'Failed to send message. Please try again or contact us via WhatsApp.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
