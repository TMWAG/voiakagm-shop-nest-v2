import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmationEmail(user: User): Promise<void> {
    try {
      const url = `http://${String(
        process.env.HOST_URL,
      )}/api/auth/confirm_email?token=${user.token}`;
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Подтверждение почты',
        template: './confirmation',
        context: {
          name: user.name,
          url,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async sendRestorationEmail(user: User): Promise<void> {
    try {
      const url = `http://${String(
        process.env.HOST_URL,
      )}/api/auth/restore_password?token=${user.token}`;
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Смена пароля',
        template: './restore_pass',
        context: {
          name: user.name,
          url,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
