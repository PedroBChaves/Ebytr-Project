const tasksService = require('../services/tasksService');

const getAllTasks = async (_req, res) => {
  try {
    const tasks = await tasksService.getAllTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { name, status } = req.body;
    const task = await tasksService.createTask(name, status);

    return res.status(201).json(task);
  } catch (error) {
    const e = JSON.parse(error.message);
    return res.status(e.code).json({ message: e.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id, name, status } = req.body;

    const taskUpdated = await tasksService.updateTask(id, name, status);

    return res.status(200).json(taskUpdated);
  } catch (error) {
    const e = JSON.parse(error.message);
    return res.status(e.code).json({ message: e.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.body;

    await tasksService.deleteTask(id);

    return res.status(204).send();
  } catch (error) {
    const e = JSON.parse(error.message);
    return res.status(e.code).json({ message: e.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
