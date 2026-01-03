import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const service = formData.get('service') as string;
    const budget = formData.get('budget') as string;
    const message = formData.get('message') as string;
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
                ${name}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                📧 Email
              </td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">
                <a href="mailto:${email}" style="color: #3b82f6;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                🎯 Service
              </td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">
                ${service}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                💰 Budget
              </td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">
                ${budget || 'Not specified'}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                📎 Attachment
              </td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">
                ${file && file.size > 0 ? `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)` : 'No attachment'}
              </td>
            </tr>
          </table>
          
          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">📝 Project Details:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #4b5563;">${message}</p>
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
