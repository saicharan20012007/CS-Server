const express = require("express");
const {
  gettasksNames,
  createTask,
  fetchTasks,
  fetchTaskData,
  editTask,
  deleteTask,
  getTaskData,
} = require("../controllers/task.controllers");
const { verifySuperAdmin } = require("../middleware/authenticator");

const TaskRouter = express.Router();

TaskRouter.use(verifySuperAdmin);

TaskRouter.post("/create", createTask);
TaskRouter.get("/fetch/names", gettasksNames);
TaskRouter.get("/fetch/assignedtasks/:projectId", fetchTasks);
TaskRouter.get("/fetch/taskData/:id", fetchTaskData);
TaskRouter.post("/edit/:id", editTask);
TaskRouter.post("/delete", deleteTask);
TaskRouter.get("/fetch", getTaskData);

module.exports = { TaskRouter };
