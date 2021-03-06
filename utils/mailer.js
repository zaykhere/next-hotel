const nodemailer = require("nodemailer");

class mailer {
  static async send(to, subject, html) {
    const transporter = nodemailer.createTransport({
      port: process.env.MAIL_PORT,
      host: process.env.MAIL_HOST,
      auth: {
        pass: process.env.MAIL_PASSWORD,
        user: process.env.MAIL_USERNAME,
      },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: process.env.MAIL_FROM_NAME,
      to: to,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
  }
}
module.exports = mailer;
