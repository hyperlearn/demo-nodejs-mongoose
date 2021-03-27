const { Employee } = require('../models');
const config = require('../config');


const create = async (req, res) => {
  console.log('create emp');

  const { empId, empName, empSalary } = req.body;

  let status;
  let message;

  try {
    const emp = new Employee({ empId, name: empName, salary: empSalary  });
    await emp.save();
    status = 200;
    message = 'Employee create successfully';
  } catch (err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request';
  }

  res.status(status).send({ message });
}

const getAll = async (req, res) => {
  let status;
  let message;

  const { filterByName } = req.query;
  
  console.log(filterByName);
  try {
    const query = {};
    if (filterByName) {
      query['name'] = filterByName;
    }
    message = await Employee.find(query);
    status = 200;
  } catch(err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request'
  }
  res.status(status).send({ message: message.map((emp) => ({
    empId: emp.empId,
    empSalary: emp.salary,
    empName: emp.name
  })) });
}



const getById = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  let status;
  let message;

  try {
    const emp = await Employee.find({ empId: id });
    status = 200;
    message = emp;

  } catch(err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request!!!'
  }

  res.status(status).send({ message });
}

module.exports = {
  create,
  getAll,
  getById,
}