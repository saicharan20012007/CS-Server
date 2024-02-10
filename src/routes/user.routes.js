const express = require("express");

const {
  createUser,
  getuserNames,
  getuserCounts,
  getUser,
  getUsers,
  searchUser,
  editUser,
  deleteUser,
} = require("../controllers/user.controllers");
const { verifySuperAdmin } = require("../middleware/authenticator");

const UserRouter = express.Router();

UserRouter.use(verifySuperAdmin);

UserRouter.post("/create", createUser);
UserRouter.get("/fetch/names", getuserNames);
UserRouter.get("/count", getuserCounts);
UserRouter.get("/fetch", getUsers);
UserRouter.get("/fetch/search", searchUser);
UserRouter.get("/fetch/:id", getUser);
UserRouter.patch("/edit/:id", editUser);
UserRouter.delete("/delete/:id", deleteUser);
module.exports = { UserRouter };
