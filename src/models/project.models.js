const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    projectAddress: {
      type: String,
      required: true,
    },
    projectSupervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("projects", projectSchema);
module.exports = Project;
