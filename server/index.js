const express = require('express')
const bodyparser = require('body-parser');
var app = express()
const PORT = 5000;
const db = require('../db-MySQL/index.js');
const cors = require("cors");

app.use(bodyparser.json());
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



app.get('/', (req,res)=> { //get method
  res.send('Hello World') //send response
})

//USERS CRUD 
app.get('/users', (req,res)=> { //get method
  db.getAllUsers(req,res)
})

app.get('/users/:id', (req,res)=> { //get one user method
  db.getOneUser(req,res)
})

app.delete('/users/:id', (req,res)=> { //del method
  db.delOneUser(req,res)
})

app.post('/users',   (req,res)=>{
  db.createUser(req,res)
})

require("./routes/casque.routes.js")(app);
app.listen(PORT,console.log(`Express is running on http://localhost:${PORT}`))