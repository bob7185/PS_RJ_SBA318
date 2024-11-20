const express = require('express');
const projects = require('../../models/Projects');
const router = express.Router();

// Get all projects
router.get('/', (req, res) => res.json(projects));

// Add a new project
router.post('/', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ msg: 'Please include a project name and description.' });
    }
    //create a new project and set its id to last project id + 1
    const newProject = { id: projects[projects.length-1]['id']+1, name, description };
    projects.push(newProject);
    res.json(projects);
});

module.exports = router;
