import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // File size validation (max 5MB)
    if (file && file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Prepare attachment if file exists
    let attachments: any[] = [];
    if (file) {
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      
      attachments.push({
        filename: file.name,
        content: base64,
      });
    }

    // Send email to yourself (notification)
    const notificationEmail = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.PERSONAL_EMAIL || 'your-email@example.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        ${file ? `<p><strong>Attachment:</strong> ${file.name}</p>` : ''}
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    // Send auto-responder email to the sender
    const autoResponderEmail = await resend.emails.send({
      from: 'Gundelly Siddartha Yadav <onboarding@resend.dev>',
      to: email,
      subject: 'Thank you for reaching out!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d9ff;">Thank you for reaching out!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message:</h3>
            <p style="margin-bottom: 0;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Check out my <a href="https://yourwebsite.com/projects" style="color: #00d9ff;">projects</a></li>
            <li>Read my latest <a href="https://yourwebsite.com/blog" style="color: #00d9ff;">blog posts</a></li>
            <li>Schedule a call with me using <a href="https://calendly.com/yourusername" style="color: #00d9ff;">Calendly</a></li>
          </ul>
          
          <p>Best regards,<br>
          <strong>Gundelly Siddartha Yadav</strong><br>
          AI/ML Specialist & Full-Stack Developer</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="font-size: 12px; color: #666;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { 
        message: 'Email sent successfully',
        notificationId: notificationEmail.data?.id,
        autoResponderId: autoResponderEmail.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
