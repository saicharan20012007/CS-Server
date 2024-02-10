const { TaskService, ProjectService } = require("../services");
const ErrorHandler = require("../utils/errorhandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

const createTask = catchAsyncErrors(async (req, res, next) => {
  try {
    const taskDetails = req.body;
    const response = await TaskService.createTask(taskDetails);
    if (taskDetails.hasOwnProperty("associatedProjects")) {
      await ProjectService.updateManyProject(
        { _id: { $in: taskDetails.associatedProjects } },
        { $push: { tasks: response._id } }
      );
    }
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const gettasksNames = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  try {
    const taskDetails = await TaskService.getTaskNames(
      { createdBy: userId },
      { _id: 1, taskName: 1 }
    );

    res.status(200).send(taskDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const fetchTasks = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { projectId } = req.params;
  try {
    const taskDetails = await TaskService.getTasks({ userId, projectId });
    // console.log(projectId);
    res.status(200).send(taskDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const fetchTaskData = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  try {
    const projectDetails = await TaskService.getTask({
      createdBy: userId,
      _id: id,
      isEnable: true,
      isDeleted: false,
    });
    console.log(projectDetails);
    res.status(200).send(projectDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const editTask = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { id } = req.params;
  const update = req.body;
  try {
    const taskDetails = await TaskService.getTaskAndUpdate(
      { createdBy: userId, _id: id, isDeleted: false },
      update
    );
    // console.log(projectDetails);
    res.status(200).send(taskDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const deleteTask = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { id, projectId } = req.query;
  try {
    const taskDetails = await TaskService.deleteTask(
      {
        createdBy: userId,
        _id: id,
        isDeleted: false,
      },
      projectId
    );
    res.status(200).send("deleted successfully");
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

const getTaskData = catchAsyncErrors(async (req, res, next) => {
  const { userId } = req.user;
  const { searchTerm, page, pageSize, isDeleted, projectId } = req.query;
  const query = {
    createdBy: userId,
    isEnable: true,
    isDeleted: isDeleted,
  };
  try {
    var taskDetails = await TaskService.getTasks({ userId, projectId });
    taskDetails = taskDetails.filter((task) =>
      task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    res.status(200).send(taskDetails);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
  // try {
  //   let taskDetails;
  //   if (searchTerm?.length > 0) {
  //     query.$or = [
  //       { taskName: { $regex: searchTerm, $options: "i" } },
  //     ];
  //     taskDetails = await TaskService.getTasksSearchName(
  //       query,
  //       { password: 0 },
  //       undefined,
  //       undefined
  //     );
  //   } else {
  //     taskDetails = await TaskService.getTasksSearchName(
  //       query,
  //       { password: 0 },
  //       page,
  //       pageSize
  //     );
  //   }

  //   return res.status(200).send(taskDetails);
  // } catch (error) {
  //   console.log(error);
  //   return next(new ErrorHandler(error.message, 400));
  // }
});
module.exports = {
  createTask,
  gettasksNames,
  fetchTasks,
  fetchTaskData,
  editTask,
  deleteTask,
  getTaskData,
};
