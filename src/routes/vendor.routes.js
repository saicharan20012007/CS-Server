const express = require("express");
const { VendorService } = require("../services");
const { verifySuperAdmin } = require("../middleware/authenticator");
const {
  createVendor,
  getVendors,
  getVendor,
  editVendor,
} = require("../controllers/vendor.controller");

const VendorRouter = express.Router();
VendorRouter.use(verifySuperAdmin);

VendorRouter.post("/create", createVendor);
VendorRouter.get("/fetch", getVendors);
VendorRouter.get("/fetch/:id", getVendor);
VendorRouter.post("/edit/:id", editVendor);
module.exports = { VendorRouter };
