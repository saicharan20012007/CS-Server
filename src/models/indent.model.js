const mongoose = require("mongoose");

const indentSchema = new mongoose.Schema(
  {
    materialName: {
      type: String,
      required: true,
    },
    unitOfMaterial: {
      type: Number,
      required: true,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects",
      },
    ],
    associatedTasks: [
      {
        project: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "projects",
        },
        tasks: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tasks",
          },
        ],
      },
    ],
    supervisorName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    date: {
      type: Date,
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

const Indent = mongoose.model("indents", indentSchema);
module.exports = Indent;
