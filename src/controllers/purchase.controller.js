const { PurchaseService } = require("../services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

const createPurchase = catchAsyncErrors(async (req, res, next) => {
    try {
      const PurchaseDetails = req.body;
      console.log("PurchaseDetails => ",PurchaseDetails)
      const response = await PurchaseService.createPurchase(PurchaseDetails);
      res.status(201).send(response);
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

const getPurchases = catchAsyncErrors(async (req,res,next) => {
  const { userId } = req.user;
  const query = {
    createdBy: userId,
    isEnable: true,
    isDeleted: false,
  };
  let projection = {};
  try {
    PurchaseDetails = await PurchaseService.getpurchases(
        query,
        projection
    );
    return res.status(200).send(PurchaseDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
}
);
module.exports = {
    createPurchase,
    getPurchases
}