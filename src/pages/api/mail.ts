import type { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

async function sendMail(req: NextApiRequest, res: NextApiResponse) {
  const transporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_TO,
      pass: process.env.MAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.MAIL_TO,
    to: process.env.MAIL_TO,
    subject: 'お問い合わせ',
    text: req.body,
  });

  res.status(200).json({
    success: true,
  });
}

export default sendMail;
