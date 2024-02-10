const crypto = require("crypto");

const generateUniquePassword = () => {
  const buffer = crypto.randomBytes(4);

  const password = buffer.toString("hex");

  return password;
};

module.exports = generateUniquePassword;