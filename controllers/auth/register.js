const bcrypt = require("bcryptjs");
const { User } = require("../../models/users");
const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use!");
  }

  const avatarURL = gravatar.url(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = createVerifyEmail(email, verificationToken);

  await sendEmail(mail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    verificationToken: newUser.verificationToken,
  });
};

module.exports = register;
