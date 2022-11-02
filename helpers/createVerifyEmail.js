const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Please confirm registration",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Push to confirm</a>`,
  };
  return mail;
};

module.exports = createVerifyEmail;
