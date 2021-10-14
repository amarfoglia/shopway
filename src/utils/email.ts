import nodemailer from 'nodemailer';

const sendEmail = async (options: any) => {
  const {
    EMAIL_HOST: host,
    EMAIL_USERNAME: user,
    EMAIL_PORT: port,
    EMAIL_PASSWORD: pass
  } = process.env;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(port) || 0,
    auth: { user, pass },
    logger: true
  });

  const mailOptions = {
    from: 'Shopway',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
