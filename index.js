const express = require('express');

// create an instance of express
const app = express();

const employees = require('./Employees')


//retrieve all employees
app.get('/api/employees', (req, res)=>{
    res.json(employees);
})

//retrieve a single employee
app.get('/api/employees/:name', (req,res)=>{
    const checkExists = employees.some(employee=> req.params.name)
    res.json(employees.filter(employee => 
        employee.name === req.params.name))
})

// checking if a PORT is available and dynamically assign it
const PORT = process.env.PORT || 3000; 


app.listen(PORT, ()=>{
    console.log(`server running at port: ${PORT}`);
})
