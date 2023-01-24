const Tasks = require("../model/taskSchema");

const getAllTasks = async (req, res, next) => {
  let tasks;
  try {
    tasks = await Tasks.find();
    res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
    next(error);
  }
  if (!tasks) {
    return res.status(404).json({ messgae: "No tasks found" });
  }
};

const createTask = async (req, res, next) => {
  let { name, completed } = req.body;
  let tasks;
  try {
    tasks = await Tasks.findOne({ name: name });
    if (tasks) {
      res.status(404).json({ mesage: "Task Name already present!" });
    }
    tasks = await Tasks.insertMany({
      name,
      completed,
    });
    res.status(200).json({
      error: false,
      messgae: "Task created successfully!",
      data: { tasks },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  let tasks;
  try {
    tasks = await Tasks.findById({ _id: req.params.id });
  } catch (error) {
    console.log(error);
    next(error);
  }
  if (!tasks) {
    res.status(404).json({
      error: true,
      messgae: "There is no Task of this Id!",
      data: { tasks },
    });
  }
  return res.status(200).json({
    error: false,
    messgae: "Task found successfully!",
    data: { tasks },
  });
};

const updateTask = async (req, res, next) => {
  let { name, completed } = req.body;
  let tasks;
  try {
    tasks = await Tasks.findOne({ _id: req.params.id });
    if (tasks) {
      tasks = await Tasks.updateOne(
        { _id: req.params.id },
        {
          $set: { name, completed },
        }
      );
      res.status(200).json({
        error: false,
        messgae: "Task updated successfully!",
        data: { tasks },
      });
    } else {
      res.status(404).json({
        error: true,
        messgae: "Invalid Id!",
        data: { tasks },
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteTaskById = async (req, res, next) => {
  let tasks;
  try {
    tasks = await Tasks.findOne({ _id: req.params.id });
    if (tasks) {
      tasks = await Tasks.deleteOne({ _id: req.params.id });
      res.status(200).json({
        error: false,
        message: "Task deleted successfully!",
        data: null,
      });
    } else {
      res.status(404).json({
        error: true,
        messgae: "Invalid Id!",
        data: { tasks },
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTaskById,
};
