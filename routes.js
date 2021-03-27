const express = require('express');
const employeeController = require('./controllers/employee.controller');


const employeeRouter = express.Router();

employeeRouter.post('/', employeeController.create);
employeeRouter.get('/', employeeController.getAll);
employeeRouter.get('/:id', employeeController.getById); // /employees/asdasd

const routes = (app) => {

  app.use('/employees', employeeRouter);

  app.get('/', (req, res) => {
    return res.send({ message: "Employee Service Up!"});
  }) 
}

module.exports = routes;