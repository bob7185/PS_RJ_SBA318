const express = require('express');
const moment = require('moment')

// create an instance of express
const app = express();

const employees = require('./Employees')
//middleware for 
app.use(express.json()); // For parsing application/json

//retrieve all employees
app.get('/api/employees', (req, res)=>{
    res.json(employees);
})

//retrieve a single employee
app.get('/api/employees/:name', (req,res)=>{
    //checking if the name exists
    const checkExists = employees.some(employee=> employee.name === req.params.name)
    if(checkExists)
    {
        res.json(employees.filter(employee => 
            employee.name === req.params.name))
    }
    else{
        //400 bad request
        res.status(400).json({msg:`Employee ${req.params.name} doesn't exist`})
    }

})

//create Employee
app.post('/api/employees', (req, res)=>{
    console.log(req.body)
    const newEmployee ={
        name: req.body.name,
        email: req.body.email,
        age: Math.round(Math.random() * (100 -18) + 18),
        added: `${moment().format()}`  
    }
    if(!newEmployee.name || !newEmployee.email)
    {
        res.status(400).json({msg:'Please include both a name and an Email! Thanks!s'});
    }
    //adding the new employee
    employees.push(newEmployee);
    res.json(employees);

})

// checking if a PORT is available and dynamically assign it
const PORT = process.env.PORT || 3000; 


app.listen(PORT, ()=>{
    console.log(`server running at port: ${PORT}`);
})
