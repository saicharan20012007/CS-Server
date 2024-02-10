const { Indent } = require("../models");

const IndentService = {
  async getIndents(query, projection, page, pageSize) {
    try {
      const indents = await Indent.find(query, projection)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate(
          "supervisorName projects associatedTasks.project associatedTasks.tasks"
        );
      return indents || [];
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getIndent(query) {
    try {
      const indent = await Indent.findOne(query);
      if (!indent) {
        throw new Error("Indent not found");
      }
      return indent;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async createIndent(indentDetails) {
    try {
      const indent = new Indent(indentDetails);
      await indent.save();
      return { message: "Indent created successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getIndentAndUpdate(query, update) {
    try {
      const indent = await Indent.findOneAndUpdate(query, update, {
        new: true,
      });
      if (!indent) {
        throw new Error("Indent not found");
      }
      return indent;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = IndentService;
