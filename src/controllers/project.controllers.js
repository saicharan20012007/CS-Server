const { ProjectService } = require("../services");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

const createProject = catchAsyncErrors(async (req, res, next) => {
  try {
    const projectDetails = req.body;

    const response = await ProjectService.createProject(projectDetails);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const getprojectNames = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  try {
    const projectDetails = await ProjectService.getProjects(
      { createdBy: userId },
      { _id: 1, projectName: 1 }
    );
    res.status(200).send(projectDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const getProjects = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { searchTerm, page, pageSize, isDeleted } = req.query;

  const query = {
    createdBy: userId,
    isEnable: true,
    isDeleted: isDeleted,
  };
  try {
    let projectDetails;
    if (searchTerm?.length > 0) {
      // query.$or = [
      //   { projectName: { $regex: searchTerm, $options: "i" } },
      //   { projectAddress: { $regex: searchTerm, $options: "i" } },
      //   { description: { $regex: searchTerm, $options: "i" } },
      // ];
      projectDetails = await ProjectService.getProjects(
        query,
        { password: 0 },
        undefined,
        undefined
      );
      let searchStr = searchTerm.toLowerCase().trim();
      projectDetails = projectDetails.filter(
        (project) =>
          project.projectName.toLowerCase().includes(searchStr) ||
          project.description.toLowerCase().includes(searchStr) ||
          project.startDate.toLowerCase().includes(searchStr) ||
          project.endDate.toLowerCase().includes(searchStr) ||
          project.projectAddress.toLowerCase().includes(searchStr) ||
          project.projectSupervisor.fullname.toLowerCase().includes(searchStr)
      );
    } else {
      projectDetails = await ProjectService.getProjects(
        query,
        { password: 0 },
        page,
        pageSize
      );
    }

    return res.status(200).send(projectDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const getProject = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  try {
    const projectDetails = await ProjectService.getProject({
      createdBy: userId,
      _id: id,
      isEnable: true,
      isDeleted: false,
    });
    res.status(200).send(projectDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const editProject = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  const update = req.body;
  try {
    const projectDetails = await ProjectService.getProjectAndUpdate(
      { createdBy: userId, _id: id, isDeleted: false },
      update
    );
    // console.log(projectDetails);
    res.status(200).send(projectDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  getprojectNames,
  createProject,
  getProjects,
  getProject,
  editProject,
};
