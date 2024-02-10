const IssueService = require("../services/issue.services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

const createIssue = catchAsyncErrors(async (req, res, next) => {
    try {
      const issueDetails = req.body;
      console.log("issueDetails => ",issueDetails)
      const response = await IssueService.createIssue(issueDetails);
      res.status(201).send(response);
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

const getIssues = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const query = {
    createdBy: userId,
    isEnable: true,
    isDeleted: false,
  };
  let projection = {};
  try {
    issueDetails = await IssueService.getIssues(
        query,
        projection
    );
    return res.status(200).send(issueDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
}
);
module.exports = {
    createIssue,
    getIssues
}