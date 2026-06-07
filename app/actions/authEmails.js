'use server';

import { adminAuth } from '@/lib/firebaseAdmin';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCustomVerificationEmail(email, name = 'Student') {
  try {
    const actionCodeSettings = {
      // URL you want to redirect back to.
      url: 'https://academia-lms-one.vercel.app/signin?verified=true',
      handleCodeInApp: false,
    };

    const link = await adminAuth.generateEmailVerificationLink(email, actionCodeSettings);

    const { data, error } = await resend.emails.send({
      from: 'Academia <onboarding@resend.dev>',
      to: [email],
      subject: 'Verify your email for Academia',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">Welcome to Academia, ${name}!</h2>
          <p style="color: #555; font-size: 16px;">
            We're thrilled to have you here. Please verify your email address to get started.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${link}" style="background-color: #6366f1; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #777; font-size: 12px; text-align: center; margin-top: 40px;">
            If you did not create an account, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Failed to send verification email:', err);
    return { success: false, error: err.message };
  }
}

export async function sendCustomPasswordResetEmail(email) {
  try {
    const actionCodeSettings = {
      url: 'https://academia-lms-one.vercel.app/signin?reset=success',
      handleCodeInApp: false,
    };

    const link = await adminAuth.generatePasswordResetLink(email, actionCodeSettings);

    const { data, error } = await resend.emails.send({
      from: 'Academia <onboarding@resend.dev>',
      to: [email],
      subject: 'Reset your Academia password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
          <p style="color: #555; font-size: 16px;">
            We received a request to reset the password for your Academia account.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${link}" style="background-color: #ef4444; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
              Reset Password
            </a>
          </div>
          <p style="color: #777; font-size: 12px; text-align: center; margin-top: 40px;">
            If you did not request this, please ignore this email. Your password will remain unchanged.
          </p>
        </div>
      `,
    });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error('Failed to send reset email:', err);
    return { success: false, error: err.message };
  }
}
