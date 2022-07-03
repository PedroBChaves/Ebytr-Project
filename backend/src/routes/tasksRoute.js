const routerTasks = require('express').Router();
const tasksController = require('../controllers/tasksController');

routerTasks.get('/tasks', tasksController.getAllTasks);
routerTasks.post('/tasks', tasksController.createTask);
routerTasks.put('/tasks', tasksController.updateTask);
routerTasks.delete('/tasks', tasksController.deleteTask);

module.exports = routerTasks;
