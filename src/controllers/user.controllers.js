const { UserService } = require("../services");
const { generateUniquePassword } = require("../utils");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

const createUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const userDetails = req.body;
    if (!userDetails.password) {
      userDetails.password = generateUniquePassword();
      console.log(userDetails.password);
    }
    const response = await UserService.createUser(userDetails);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const getuserNames = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  try {
    const userDetails = await UserService.getUsers(
      { createdBy: userId, isEnable: true, isDeleted: false },
      { _id: 1, fullname: 1 }
    );
    res.status(200).send(userDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const getuserCounts = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;

  const { isDeleted, isEnable } = req.query;

  try {
    const userCount = await UserService.countUsers({
      createdBy: userId,
      isEnable: isEnable,
      isDeleted: isDeleted,
    });
    res.status(201).send({ userCount });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const getUsers = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { page, pageSize, isEnable, isDeleted } = req.query;
  try {
    const userDetails = await UserService.getUsers(
      {
        createdBy: userId,
        isEnable: isEnable,
        isDeleted: isDeleted,
      },
      { password: 0 },
      page,
      pageSize
    );
    return res.status(200).send(userDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const searchUser = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { searchTerm, page, pageSize, isEnable, isDeleted } = req.query;

  const query = {
    createdBy: userId,
    isEnable,
    isDeleted,
  };
  try {
    let userDetails;
    if (searchTerm.length > 0) {
      query.$or = [
        { fullname: { $regex: searchTerm, $options: "i" } },
        { role: { $regex: searchTerm, $options: "i" } },
      ];
      userDetails = await UserService.getUsers(
        query,
        { password: 0 },
        undefined,
        undefined
      );
    } else {
      userDetails = await UserService.getUsers(
        query,
        { password: 0 },
        page,
        pageSize
      );
    }

    return res.status(200).send(userDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const getUser = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  try {
    const userDetails = await UserService.getUser(
      { createdBy: userId, _id: id, isEnable: true, isDeleted: false },
      { password: 0 }
    );
    res.status(200).send(userDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const editUser = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  const update = req.body;
  try {
    const userDetails = await UserService.getUserAndUpdate(
      { createdBy: userId, _id: id, isDeleted: false },
      update
    );
    console.log(userDetails);
    res.status(200).send(userDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  const update = { isDeleted: true, isEnable: false };
  try {
    const userDetails = await UserService.getUserAndUpdate(
      { createdBy: userId, _id: id, isDeleted: false },
      update
    );
    res.status(200).send(userDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  createUser,
  getUser,
  getUsers,
  getuserCounts,
  editUser,
  getuserNames,
  searchUser,
  deleteUser,
};