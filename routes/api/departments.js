const express = require('express');
const departments = require('../../models/Departments');
const router = express.Router();

// Get all departments
router.get('/', (req, res) => res.json(departments));

// Create a new department
router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ msg: 'Please include a department name.' });
    }
    const newDepartment = { id: departments.length + 1, name };
    departments.push(newDepartment);
    res.json(departments);
});

module.exports = router;
