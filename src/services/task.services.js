const { Task, Project } = require("../models");
const mongoose = require("mongoose");
const TaskService = {
  async createTask(taskDetails) {
    try {
      const task = new Task(taskDetails);
      const savedTask = await task.save();
      return savedTask;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getTasksSearchName(query, projection, page, pageSize) {
    try {
      const tasks = await Task.find(query, projection)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      console.log("Projects => ", tasks);
      return tasks || [];
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getTasks(query) {
    try {
      const tasks = await Task.find({
        associatedProjects: { $in: [query.projectId] },
        isEnable: true,
        isDeleted: false,
        createdBy: query.userId,
      });
      // console.log(tasks.length);
      return tasks;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getTaskNames(query, Taskion) {
    try {
      const tasks = await Task.find(query, Taskion);
      return tasks;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getTask(query) {
    try {
      const task = await Task.findOne(query);
      console.log("Getting task : ", query);
      if (!task) {
        throw new Error("Not found");
      }
      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getTaskAndUpdate(query, update) {
    try {
      const task = await Task.findOneAndUpdate(query, update, {
        new: true,
      });
      if (!task) {
        throw new Error("Task not found");
      }
      return task;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async deleteTask(query, projectId) {
    try {
      const task = await Task.findOne(query);
      if (task) {
        const project = await Project.findById(projectId);
        const updatedTaskInProjectList = project.tasks.filter(
          (item) => item.toString() !== task._id.toString()
        );
        await Project.updateOne(
          { _id: projectId },
          { tasks: updatedTaskInProjectList }
        );
        const taskData = await Task.findById({ _id: task._id });
        const updatedProjectsinTask = taskData.associatedProjects.filter(
          (item) => item.toString() !== projectId
        );
        if (updatedProjectsinTask && updatedProjectsinTask.length)
          await Task.updateOne(
            { _id: task._id },
            { associatedProjects: updatedProjectsinTask }
          );
        else await Task.findByIdAndDelete({ _id: task._id });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = TaskService;
