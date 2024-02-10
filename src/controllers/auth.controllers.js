const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserService } = require("../services");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

const Login = catchAsyncErrors(async (req, res, next) => {
  try {
    const { otp } = req.body;
    console.log(req.body);

    console.log(otp);

    const isMatch = otp == 123456;
    if (!isMatch) {
      return next(new ErrorHandler("Invalid otp", 401));
    }

    const token = jwt.sign({ otp }, process.env.jwt_key, { expiresIn: "15d" });
    res.status(200).send({ token: `Bearer ${token}` });
  } catch (error) {
    return next(new ErrorHandler("Invalid credentials", 500));
  }
});

module.exports = {
  Login,
};
