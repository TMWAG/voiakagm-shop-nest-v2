import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmationEmail(user: User, token: string): Promise<void> {
    try {
      const url = `http://${String(
        process.env.HOST_URL,
      )}/auth/confirm?token=${token}`;
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

  async sendSendRestorationEmail(user: User): Promise<void> {
    try {
      const url = `http://${String(
        process.env.HOST_URL,
      )}/auth/restore_pass?token=${user.token}`;
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
