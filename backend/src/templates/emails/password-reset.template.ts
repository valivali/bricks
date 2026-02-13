import { baseEmailLayout } from "./base.layout.js"

export const passwordResetEmailTemplate = (resetUrl: string) =>
  baseEmailLayout(`
    <h2 style="margin-top: 0; color: #1a1a1a;">Reset your password</h2>
    <p style="font-size: 16px; color: #555;">Forgot your password? That's okay, it happens! Click the button below to reset it and get back to work.</p>
    <p style="font-weight: bold; color: #1a1a1a;">Don't worry, we've got you covered.</p>
    <a href="${resetUrl}" class="button">Reset Your Password</a>
    <p style="font-size: 14px; color: #888;">If the button doesn't work, copy and paste this link into your browser:</p>
    <p style="font-size: 12px; color: #007bff; word-break: break-all;">${resetUrl}</p>
    <p style="font-size: 12px; color: #999; margin-top: 20px;">This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.</p>
`)
