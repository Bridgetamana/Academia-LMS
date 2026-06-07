'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInviteEmail(studentEmail, academyName) {
  try {
    const data = await resend.emails.send({
      from: 'Academia <onboarding@resend.dev>',
      to: [studentEmail],
      subject: `You have been invited to join ${academyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">Welcome to Academia LMS</h2>
          <p style="color: #555; font-size: 16px;">
            You have been invited to join <strong>${academyName}</strong>!
          </p>
          <p style="color: #555; font-size: 16px;">
            To access your courses and start learning, please complete your registration by clicking the button below.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://academia-lms-one.vercel.app/signup?email=${encodeURIComponent(studentEmail)}&role=student" style="background-color: #6366f1; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
              Accept Invitation & Sign Up
            </a>
          </div>
          <p style="color: #777; font-size: 12px; text-align: center; margin-top: 40px;">
            If you did not expect this invitation, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: error.message };
  }
}
