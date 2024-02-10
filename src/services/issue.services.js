const { Issue } = require("../models");

const IssueService = {
  async getIssues(query, projection) {
    try {
      const issues = await Issue.find(query, projection);
      return issues;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async createIssue(issueDetails) {
    try {
      const issue = new Issue(issueDetails);
      await issue.save();
      return { message: "Issue created successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = IssueService;
