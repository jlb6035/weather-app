// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({extended: true}));
app.use(express.json()) 
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

app.get("/getData", (req, res)=>{
    console.log("Sending data....");
    console.log(projectData);
    res.send(projectData);
});


app.post("/addData", (req, res)=>{
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.message = req.body.message;
    console.log(projectData);
});

// Setup Server
app.listen(3000, ()=>{
    console.log("Server started on port 3000");
})