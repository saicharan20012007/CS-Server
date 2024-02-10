const express = require("express");
const { verifySuperAdmin } = require("../middleware/authenticator");
const {
  createProject,
  getprojectNames,
  getProjects,
  getProject,
  editProject,
} = require("../controllers/project.controllers");

const ProjectRouter = express.Router();

ProjectRouter.use(verifySuperAdmin);

ProjectRouter.post("/create", createProject);
ProjectRouter.get("/fetch/names", getprojectNames);
ProjectRouter.get("/fetch", getProjects);
ProjectRouter.get("/fetch/:id", getProject);
ProjectRouter.patch("/edit/:id", editProject);

module.exports = { ProjectRouter };
