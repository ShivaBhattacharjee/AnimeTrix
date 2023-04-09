const singleChat = require("./modal/singleChatModal");

const validateEmail = (req, res, next) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  next();
};

module.exports =  validateEmail;