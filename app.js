const express = require('express');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const methodOverride = require('method-override');

const app = express();

app.use(express.static('public'));
app.use(methodOverride('_method'));

// Parse JSON
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

// logging middleware        
app.use(logger);                  

// Error-handling middleware
app.use(errorHandler);

// API Routes
app.use('/api/employees', require('./routes/api/employees'));
app.use('/api/departments', require('./routes/api/departments'));
app.use('/api/projects', require('./routes/api/projects'));

// Setting up templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Render main page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Employee Management System',
        description: 'Manage Employees, Departments, and Projects',
    });
});

// Dynamic Port
const PORT = process.env.PORT || 4040;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
