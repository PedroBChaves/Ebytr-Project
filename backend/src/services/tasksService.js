const tasksModel = require('../models/tasksModel');

const getAllTasks = async () => {
  const tasks = await tasksModel.getAllTasks();

  if (!tasks) {
    const e = JSON.stringify({ code: 404, message: 'Tasks not found' });
    throw new Error(e);
  }

  return tasks;
};

const createTask = async (name, status) => {
  const res = await tasksModel.createTask(name, status);
  return res;
};

const updateTask = async (id, name, status) => {
  const res = await tasksModel.updateTask(id, name, status);
  return res;
};

const deleteTask = async (id) => {
  await tasksModel.deleteTask(id);
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
