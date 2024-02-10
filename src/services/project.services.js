const { Project } = require("../models");

const ProjectService = {
  async getProjects(query, projection, page, pageSize) {
    try {
      const projects = await Project.find(query, projection)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate("projectSupervisor tasks");
      return projects || [];
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getProject(query) {
    try {
      const project = await Project.findOne(query);
      if (!project) {
        throw new Error("Project not found");
      }
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async createProject(projectDetails) {
    try {
      const project = new Project(projectDetails);
      await project.save();
      return { message: "Project created successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getProjectAndUpdate(query, update) {
    try {
      const project = await Project.findOneAndUpdate(query, update, {
        new: true,
      });
      if (!project) {
        throw new Error("Project not found");
      }
      return project;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async updateManyProject(query, update) {
    try {
      await Project.updateMany(query, update);
      return { message: "Project updated successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = ProjectService;
