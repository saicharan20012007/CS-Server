const express = require("express");
const { verifySuperAdmin } = require("../middleware/authenticator");
const { createIssue , getIssues } = require("../controllers/issue.controllers");
const IssueRouter = express.Router();
IssueRouter.use(verifySuperAdmin)

IssueRouter.post("/create", createIssue);
IssueRouter.get("/fetch",getIssues);
module.exports = { IssueRouter };
