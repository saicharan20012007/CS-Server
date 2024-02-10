const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    taskIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "tasks",
        },
      ],
      default: [],
      required: true,
    },
    description: {
      type: String,
      required: true,
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

const Issue = mongoose.model("issues", issueSchema);
module.exports = Issue;
