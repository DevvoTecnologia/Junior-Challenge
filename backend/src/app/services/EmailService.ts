import nodemailer from 'nodemailer';
import { env } from '../env';

export class EmailService {
  constructor() { }

  public async sendEmail(emailUser: string, token: string) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: env.MAIL_USER,
          pass: env.MAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: env.MAIL_USER,
        to: emailUser,
        subject: 'Seu Link Mágico de Autenticação',
        text: `Clique no link para se autenticar: http://localhost:3000/verify-auth?token=${token}`
      };

      return await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }
}