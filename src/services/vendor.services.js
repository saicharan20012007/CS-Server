const { Vendor } = require("../models");

const VendorService = {
  async getVendors(query, projection) {
    try {
      const vendors = await Vendor.find(query, projection);
      return vendors;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getVendorAndUpdate(query, update) {
    try {
      const vendor = await Vendor.findOneAndUpdate(query, update, {
        new: true,
      });
      if (!vendor) {
        throw new Error("Vendor not found");
      }
      return vendor;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async createVendor(vendorDetails) {
    try {
      const vendor = new Vendor(vendorDetails);
      await vendor.save();
      return { message: "Vendor created successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getVendor(query, projection) {
    try {
      const project = await Vendor.findOne(query, projection);
      if (!project) {
        throw new Error("Vendor not found");
      }
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = VendorService;
