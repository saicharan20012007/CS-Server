const { VendorService } = require("../services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const createVendor = catchAsyncErrors(async (req, res) => {
  try {
    const VendorDetails = req.body;
    console.log("VendorDetails => ", VendorDetails);
    const response = await VendorService.createVendor(VendorDetails);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

const getVendors = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { searchTerm } = req.query;
  const query = {
    createdBy: userId,
    isEnable: true,
    isDeleted: false,
  };

  try {
    let vendorDetails;
    if (searchTerm?.length > 0) {
      vendorDetails = await VendorService.getVendors(query, { password: 0 });
      let searchStr = searchTerm.toLowerCase().trim();
      vendorDetails = vendorDetails.filter(
        (vendor) =>
          vendor.vendorName.toLowerCase().includes(searchStr) ||
          vendor.vendorType.toLowerCase().includes(searchStr) ||
          vendor.contactPerson.toLowerCase().includes(searchStr)
      );
    } else {
      vendorDetails = await VendorService.getVendors(query, { password: 0 });
    }

    return res.status(200).send(vendorDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});
const getVendor = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  try {
    const vendorDetails = await VendorService.getVendor({
      createdBy: userId,
      _id: id,
      isEnable: true,
      isDeleted: false,
    });
    res.status(200).send(vendorDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const editVendor = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  const update = req.body;
  try {
    const vendorDetails = await VendorService.getVendorAndUpdate(
      { createdBy: userId, _id: id, isDeleted: false },
      update
    );
    // console.log(projectDetails);
    res.status(200).send(vendorDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  createVendor,
  getVendors,
  getVendor,
  editVendor,
};
