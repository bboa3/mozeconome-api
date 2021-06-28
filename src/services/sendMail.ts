import nodemailer from 'nodemailer';

interface sendMailProps {
  from: string
  to: string
  subject: string
  text: string
  html: string
}

const sendMail = async ({from, to, subject, text, html}: sendMailProps) => {

  let transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-2.amazonaws.com',
    // host: 'smtp.mailtrap.io',
    port: Number(process.env.SMTP_PORT),
    secure: false, 
    auth: {
      user: process.env.SES_SMTP_USER,
      pass: process.env.SES_SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
  })
  await transporter.sendMail({ from, to, subject, text, html });
}

export default sendMail;
