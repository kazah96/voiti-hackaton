import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const EMAIL = 'latypov199619@gmail.com';
const EMAIL_PASS = 'cb3e6771c7mailru';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.elasticemail.com',
        port: 587,
        secure: false,
        auth: {
          user: EMAIL,
          pass: 'A1D4E0CBFBF1F72F1F484208DF323B7AB956',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
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
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
