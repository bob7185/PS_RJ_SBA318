const express = require('express');
const moment = require('moment');
const employees = require('../../Employees')

const router = express.Router();

//retrieve all employees
router.get('/', (req, res)=>{
    res.json(employees);
})

//retrieve a single employee
router.get('/:name', (req,res)=>{
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
router.post('/', (req, res)=>{
    console.log(req.body)
    const newEmployee ={
        //automatically assign the id 
        id: employees[employees.length -1].id + 1,
        name: req.body.name,
        email: req.body.email,
        added: `${moment().format()}`  
    }
    if(!newEmployee.name || !newEmployee.email)
    {
        res.status(400).json({msg:'Please include both a name and an Email! Thanks!'});
    }
    //adding the new employee
    employees.push(newEmployee);
    res.json(employees);

});

// update an employee. 
router.put('/:name', (req, res)=>{
    const checkExists = employees.some(employee=> employee.name === req.params.name);
    if(checkExists)
    {
        const updateEmployee = req.body; 
        employees.forEach(employee => {
            if(employee.name === req.params.name)
            {
                // update employee fields 
                employee.name = updateEmployee.name ? updateEmployee.name : employee.name;
                employee.email = updateEmployee.email ? updateEmployee.email: employee.email
                res.json({msg: `Employee updated`, employee});
            }  
        });
    }
    else{
        res.status(400).json({msg: `Employee ${req.params.name} doesn't exist`});
    }
})


router.delete('/:name', (req, res)=>{
    const checkExists = employees.some(employee=> employee.name === req.params.name);
    if(checkExists)
    {
        res.json({msg:'Employee deleted',
            employees: employees.filter(employee => employee.name !== req.params.name)
        })
    }
    else{
        res.status(400).json({msg: `Employee ${req.params.name} doesn't exist`});
    }
})



module.exports = router;
