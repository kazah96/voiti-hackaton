import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserKey(email: string, token: string) {
    await this.mailerService.sendMail({
      envelope: {
        from: '',
        to: email,
        bcc: 'rvmvzvnov404@yandex.ru',
        cc: 'rvmvzvnov404@yandex.ru',
      },
      to: email,
      from: '"Войти и точка" <support@example.com>',
      subject: 'Теперь все двери открыты, брат',
      template: './confirmation',
      context: {
        token,
      },
    });
  }
}
