
# Employee Management System

This is a simple Employee Management System built with **Node.js**, **Express**, and **EJS** as a template engine. The application allows for managing employee data with CRUD operations (Create, Read, Update, Delete), search functionality, and form validation.

## Features

- **View Employee List**: Display all employees with the ability to search by ID, name, email, or age.
- **Add New Employee**: Form to add a new employee with validation for required fields (name, email, age).
- **Edit Employee**: Form to update the details of an existing employee.
- **Delete Employee**: Option to remove an employee from the list.
- **Search Functionality**: Search employees based on name, email, ID, or age.
- **Error Handling**: Handles missing employee data and failed CRUD operations.

## Tech Stack

- **Backend**: Node.js, Express
- **Template Engine**: EJS
- **Middleware**: Custom middleware for logging and validation
- **Styling**: Basic CSS for UI
- **Database**: In-memory data (no external database used for simplicity)

## Getting Started

### 1. GitHub Repository
```bash
git clone https://github.com/bob7185/PS_RJ_SBA318
```

### 2. Install Dependencies

Install all required dependencies with npm:

```bash
npm install
```

### 3. Run the Application

To run the application, use the following command:

```bash
npm start
```

The application will be available at `http://localhost:4040` by default. You can change the port in `app.js` if necessary.

### 4. Directory Structure

```bash
├── app.js                    # Main entry point for the application
├── middleware
│   ├── errorHandler.js        # Custom error-handling middleware
│   └── logger.js              # Custom logging middleware
    |__ validateEmployee.js    # Custom Middleware that validate if all info were entered when adding a nw employee
├── models
│   └── Employees.js           # Employee data model (in-memory)
├── routes
│   └── api
│       └── employees.js       # Employee-related API routes
│       └── departments.js     # Department routes (allows getting the current list of departments and adding a new one)     
└──     |___ projects.js       # projects routes (allows getting the current list of projects and adding new project ) 
├── views
│   ├── employees.ejs          # Employee management UI
    |___projects.ejs           # view to interact with the projects ap. UI not implemented yet 
    |___departments.ejs        # View to interact with the departments api. UI not implemented yet
│   ├── index.ejs              # Main page of the application
├── public
│   └── styles.css             # contains the css file for basic styling
└── package.json               # NPM package metadata
```

### 5. Employee API Endpoints

The API exposes the following endpoints for managing employees:

#### **GET** `/api/employees`
Fetch all employees or search based on a query string (e.g., `?search=John`).

- **Query Parameters**:
    - `search`: Can be used to filter employees by `id`, `name`, `email`, or `age`.
    
Example:
```bash
GET /api/employees?search=John
```

#### **POST** `/api/employees`
Add a new employee. Requires the fields `name`, `email`, and `age`.

- **Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "age": 30
    }
    ```

#### **GET** `/api/employees/new`
Render a form to add a new employee.

#### **GET** `/api/employees/:id`
Fetch a specific employee by ID.

- **URL Parameter**:
    - `id`: The ID of the employee to fetch.

#### **PUT** `/api/employees/:id`
Update an existing employee. Requires the fields `name`, `email`, and `age`.

- **URL Parameter**:
    - `id`: The ID of the employee to update.
  
- **Body**:
    ```json
    {
      "name": "John Doe Updated",
      "email": "john.doe.updated@example.com",
      "age": 31
    }
    ```

#### **DELETE** `/api/employees/:id`
Delete an employee by ID.

- **URL Parameter**:
    - `id`: The ID of the employee to delete.

#### **GET** `/api/employees/:id/edit`
Render a form to edit an existing employee.

### 6. Views and Templates

#### **index.ejs**: 
The main page that provides an overview and links to manage employees, departments, and projects.

#### **employees.ejs**:
Handles the display and management of employee data. Based on the `action` passed from the route, it can show:
- A list of employees with options to search, edit, or delete.
- A form to add or edit employee details.
- A detailed view of a single employee.

### 7. Middleware

- **logger.js**: Logs HTTP requests to the console.
- **validateEmployee.js**: Validates that `name`, `email`, and `age` fields are provided when adding or updating employees.
- **errorHandler.js**: A placeholder for custom error handling. Can be expanded based on future needs.


