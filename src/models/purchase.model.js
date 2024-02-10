const mongoose = require("mongoose");

const purchaseOrderSchema = new mongoose.Schema(
  {
    purchaseOrderNo: {
      type: String,
      required: true,
    },
    vendorName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendors",
      required: true,
    },
    materialName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "indents",
      required: true,
    },
    unitOfMaterial: {
      type: Number,
      required: true,
    },
    siteName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    billingDescription: {
      type: String,
    },
    isEnable: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("purchase", purchaseOrderSchema);
module.exports = Purchase;
