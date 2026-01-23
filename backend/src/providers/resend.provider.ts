import { Resend } from "resend"
import { env } from "../config/env.config.js"

export interface EmailProviderInterface {
  sendVerificationEmail(to: string, token: string): Promise<void>
  sendPasswordResetEmail(to: string, token: string): Promise<void>
}

export class ResendEmailProvider implements EmailProviderInterface {
  constructor(private readonly resend: Resend, private readonly fromEmail: string) {}

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const verificationUrl = `${env.frontendUrl}/auth/verify-email?token=${token}`
    
    await this.resend.emails.send({
      from: this.fromEmail,
      to,
      subject: "Verify your email address",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Verify your email</h1>
          <p>Thank you for signing up! Please click the button below to verify your email address.</p>
          <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 16px 0;">
            Verify Email
          </a>
          <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #007bff; word-break: break-all;">${verificationUrl}</p>
          <p style="color: #999; font-size: 12px; margin-top: 32px;">If you didn't create an account, you can safely ignore this email.</p>
        </div>
      `
    })
  }

  async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    const resetUrl = `${env.frontendUrl}/auth/reset-password?token=${token}`
    
    await this.resend.emails.send({
      from: this.fromEmail,
      to,
      subject: "Reset your password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Reset your password</h1>
          <p>You requested to reset your password. Click the button below to create a new password.</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 16px 0;">
            Reset Password
          </a>
          <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #007bff; word-break: break-all;">${resetUrl}</p>
          <p style="color: #999; font-size: 12px; margin-top: 32px;">This link will expire in 1 hour.</p>
          <p style="color: #999; font-size: 12px;">If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
      `
    })
  }

  static build(): ResendEmailProvider {
    return new ResendEmailProvider(new Resend(env.resendApiKey), env.fromEmail)
  }
}
