const express = require("express");
const { IndentService } = require("../services");
const { verifySuperAdmin } = require("../middleware/authenticator");
const {
  createIndent,
  getIndentsData,
  getIndentData,
  editIndent,
} = require("../controllers/indent.controllers");

const IndentRouter = express.Router();
IndentRouter.use(verifySuperAdmin);
IndentRouter.post("/create", createIndent);
IndentRouter.get("/fetch", getIndentsData);
IndentRouter.get("/fetch/:id", getIndentData);
IndentRouter.patch("/edit/:id", editIndent);

module.exports = { IndentRouter };
