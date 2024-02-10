const { IndentService } = require("../services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

const createIndent = catchAsyncErrors(async (req, res, next) => {
  try {
    const IndentDetails = req.body;

    const response = await IndentService.createIndent(IndentDetails);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const getIndentsData = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { searchTerm, page, pageSize, isDeleted } = req.query;
  const query = {
    createdBy: userId,
    isEnable: true,
    isDeleted: isDeleted,
  };
  let projection = {};
  try {
    let indentDetails;
    if (searchTerm?.length > 0) {
      // query.$or = [
      //   { materialName: { $regex: searchTerm, $options: "i" } },
      //   { unitOfMaterial: { $regex: searchTerm, $options: "i" } },
      // ];
      indentDetails = await IndentService.getIndents(
        query,
        projection,
        undefined,
        undefined
      );
      let searchStr = searchTerm.toLowerCase().trim();
      indentDetails = indentDetails.filter(
        (indent) =>
          indent?.materialName.toLowerCase().includes(searchStr) ||
          indent?.unitOfMaterial.toString() == searchStr ||
          (indent.hasOwnProperty(date) && indent.date
            ? indent.date.toLowerCase().includes(searchStr)
            : false) ||
          indent?.supervisorName.fullname.toLowerCase().includes(searchStr)
      );
    } else {
      indentDetails = await IndentService.getIndents(
        query,
        projection,
        page,
        pageSize
      );
    }

    return res.status(200).send(indentDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const getIndentData = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  try {
    const indentDetails = await IndentService.getIndent({
      createdBy: userId,
      _id: id,
      isEnable: true,
      isDeleted: false,
    });
    res.status(200).send(indentDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const editIndent = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  const update = req.body;
  try {
    const indentDetails = await IndentService.getIndentAndUpdate(
      { createdBy: userId, _id: id, isDeleted: false },
      update
    );
    // console.log(projectDetails);
    res.status(200).send(indentDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  createIndent,
  getIndentsData,
  getIndentData,
  editIndent,
};
