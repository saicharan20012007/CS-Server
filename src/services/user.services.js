// services/userService.js
const { User } = require("../models");

const UserService = {
  async getUsers(query, projection, page, pageSize) {
    try {
      const users = await User.find(query, projection)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async countUsers(query) {
    try {
      const userCount = await User.countDocuments(query);
      return userCount;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async createUser(userDetails) {
    try {
      const user = new User(userDetails);
      await user.save();
      return { message: "User created successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getUser(query, projection) {
    try {
      const user = await User.findOne(query, projection);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getUserAndUpdate(query, update) {
    try {
      const user = await User.findOneAndUpdate(query, update, { new: true });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email });
      console.log("user for email: ",user);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = UserService;
