const express = require('express');
const employees = require('./Employees')
// create an instance of expres
const app = express();
//middleware  for parsing  the json data from post requests
app.use(express.json()); 

//setting up the routes 
app.use('/api/employees', require('./routes/api/employees'))

// checking if a PORT is available and dynamically assign it
const PORT = process.env.PORT || 4000; 


app.listen(PORT, ()=>{
    console.log(`server running at port: ${PORT}`);
})
