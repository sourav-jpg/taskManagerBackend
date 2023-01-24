const express = require('express');
const route = express.Router();
const controller = require("../controller/controller");


route.get('/',controller.getAllTasks);
route.post('/',controller.createTask);
route.get('/:id',controller.getTaskById);
route.put("/:id",controller.updateTask);
route.delete("/:id",controller.deleteTaskById);




module.exports = route