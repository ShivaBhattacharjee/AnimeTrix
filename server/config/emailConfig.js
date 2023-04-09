module.exports = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'textify80@gmail.com',
    pass: process.env.EMAIL_PASSWORD || "nacatwkwalqpnbzk",
  },
};