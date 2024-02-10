const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorhandler.js");

const verifySuperAdmin = catchAsyncErrors((req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("Invalid access token", 401));
  }

  jwt.verify(token, process.env.jwt_key, (err, user) => {
    if (err) {
      return next(new ErrorHandler("Invalid access token", 403));
    } else {
      if (user.role === "SuperAdmin") {
        req.user = user;
        req.body.createdBy = user.userId;
        next();
      }
    }
  });
});

module.exports = { verifySuperAdmin };