const express = require('express');
const moment = require('moment');
const employees = require('../../models/Employees'); // Employee data
const validateEmployee = require('../../middleware/validateEmployee');

const router = express.Router();
const basePath = '/api/employees'; // Define base path

// Base path for all employees
router.route('/')
    .get((req, res) => {
        const searchQuery = req.query.search || ''; // Get the search query from URL params
        // Filter employees based on the search query in name, email, age, or id
        const filteredEmployees = employees.filter(employee => 
            employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            employee.id.toString().includes(searchQuery) ||
            employee.age.toString().includes(searchQuery)
        );

        // If no employees found, show an error message
        const errorMessage = filteredEmployees.length === 0 ? 'No employees found matching your search criteria.' : null;
        
        res.render('employees', {
            title: 'Employee Management',
            description: 'Manage Employees',
            action: 'show',
            employees: filteredEmployees,
            searchQuery,
            errorMessage,
            basePath
        });
    })
    .post(validateEmployee, (req, res) => {
        const newEmployee = {
            id: employees.length ? employees[employees.length - 1].id + 1 : 1,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            added: moment().format()
        };

        employees.push(newEmployee);
        res.redirect(basePath); // Redirect to the list page showing all employees
    });

// Add new employee form
router.get('/new', (req, res) => {
    res.render('employees', {
        title: 'Add Employee',
        description: 'Add a New Employee',
        action: 'form',
        formAction: '', // No ID for a new employee
        method: 'POST',
        buttonText: 'Add Employee',
        employee: null, // Explicitly pass null to avoid errors
        basePath
    });
});

// Single employee operations
router
    .route('/:id')
    // View a single employee
    .get((req, res) => {
        const employee = employees.find(emp => emp.id === parseInt(req.params.id));
        if (!employee) {
            return res.status(404).render('employees', {
                title: 'Error',
                description: 'Error',
                action: 'error',
                errorMessage: `Employee with ID ${req.params.id} not found`,
                basePath
            });
        }

        res.render('employees', {
            title: 'Employee Details',
            description: `Details of ${employee.name}`,
            action: 'view',
            employee,
            basePath
        });
    })
    // Update an employee
    .put(validateEmployee, (req, res) => {
        const index = employees.findIndex(emp => emp.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).render('employees', {
                title: 'Error',
                description: 'Error',
                action: 'error',
                errorMessage: `Employee with ID ${req.params.id} not found`,
                basePath
            });
        }

        const updatedEmployee = {
            ...employees[index],
            ...req.body,
            updated: moment().format()
        };

        employees[index] = updatedEmployee;
        res.redirect(basePath); // Redirect to the list of employees
    })
    // Delete an employee
    .delete((req, res) => {
        const index = employees.findIndex(emp => emp.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).render('employees', {
                title: 'Error',
                description: 'Error',
                action: 'error',
                errorMessage: `Employee with ID ${req.params.id} not found`,
                basePath
            });
        }

        employees.splice(index, 1);
        res.redirect(basePath); // Redirect to the list
    });

// Edit employee form
router.get('/:id/edit', (req, res) => {
    const employee = employees.find(employee => employee.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(404).render('employees', {
            title: 'Error',
            description: 'Error',
            action: 'error',
            errorMessage: `Employee with ID ${req.params.id} not found`,
            basePath
        });
    }

    res.render('employees', {
        title: 'Edit Employee',
        description: `Edit Details of ${employee.name}`,
        action: 'form',
        employee,
        formAction: `/${employee.id}?_method=PUT`,
        method: 'PUT',
        buttonText: 'Update Employee',
        basePath
    });
});

module.exports = router;
