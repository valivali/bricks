import { baseEmailLayout } from "./base.layout.js"

export const verificationEmailTemplate = (verificationUrl: string) =>
  baseEmailLayout(`
    <h2 style="margin-top: 0; color: #1a1a1a;">Verify your email</h2>
    <p style="font-size: 16px; color: #555;">We're excited to have you on board! Let's get your account ready so you can start building.</p>
    <p style="font-weight: bold; color: #1a1a1a;">We've got you covered every step of the way.</p>
    <a href="${verificationUrl}" class="button">Verify Email Address</a>
    <p style="font-size: 14px; color: #888;">If the button doesn't work, copy and paste this link into your browser:</p>
    <p style="font-size: 12px; color: #007bff; word-break: break-all;">${verificationUrl}</p>
`)
