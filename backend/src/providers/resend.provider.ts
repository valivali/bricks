import { Resend } from "resend"
import { env } from "../config/env.config.js"
import { verificationEmailTemplate } from "../templates/emails/verification.template.js"
import { passwordResetEmailTemplate } from "../templates/emails/password-reset.template.js"

export interface EmailProviderInterface {
  sendVerificationEmail(to: string, token: string): Promise<void>
  sendPasswordResetEmail(to: string, token: string): Promise<void>
}

export class ResendEmailProvider implements EmailProviderInterface {
  constructor(
    private readonly resend: Resend,
    private readonly fromEmail: string
  ) {}

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const verificationUrl = `${env.frontendUrl}/auth/verify-email?token=${token}`

    await this.resend.emails.send({
      from: this.fromEmail,
      to,
      subject: "Verify your email address",
      html: verificationEmailTemplate(verificationUrl)
    })
  }

  async sendPasswordResetEmail(to: string, token: string): Promise<void> {
    const resetUrl = `${env.frontendUrl}/auth/reset-password?token=${token}`

    await this.resend.emails.send({
      from: this.fromEmail,
      to,
      subject: "Reset your password",
      html: passwordResetEmailTemplate(resetUrl)
    })
  }

  static build(): ResendEmailProvider {
    return new ResendEmailProvider(new Resend(env.resendApiKey), env.fromEmail)
  }
}
