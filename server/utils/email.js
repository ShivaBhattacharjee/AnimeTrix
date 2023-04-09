const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');

const transporter = nodemailer.createTransport(emailConfig);

async function sendVerificationEmail(to, token) {

  const info = await transporter.sendMail({
    from: '<h1>"Textify"</h1> <textify80@gmail.com>',
    to,
    subject: 'Verify your email',
    html: `<h1>Token: ${token}</h1>`,
  });

  console.log(`Email sent to ${to}: ${info.messageId}`);
}

module.exports = sendVerificationEmail