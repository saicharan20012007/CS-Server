const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    contactNumber: {
      type: String,
      unique: true,
      validate: {
        validator: function (v) {
          // Validate that the mobile number is exactly 10 digits
          return /^[0-9]{10}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid 10-digit mobile number!`,
      },
      required: true,
    },
    role: {
      type: String,
      enum: [
        "SuperAdmin",
        "Admin",
        "ProjectManager",
        "SiteSupervisor",
        "SiteStaff",
      ],
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    dateOfJoin: {
      type: String,
      required: true,
    },
    projectIds: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "projects",
        },
      ],
      default: [],
    },
    controls: { type: Array, default: [] },
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

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
