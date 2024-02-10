const mongoose = require("mongoose");

require("dotenv").config();

const connection = () => {
  return mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("succesfully connected to db"))
    .catch((error) => console.log("Error:" + error.message));
};

module.exports = connection;
