import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  providers: [MailService],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: String(process.env.EMAIL_HOST),
        secure: true,
        auth: {
          user: String(process.env.EMAIL_USER),
          pass: String(process.env.EMAIL_PASS),
        },
      },
      defaults: {
        from: `"No reply" <${String(process.env.EMAIL_USER)}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  exports: [MailService],
})
export class MailModule {}
