const express = require('express')
const bodyparser = require('body-parser');
var app = express()
const PORT = 3000;
const db = require('../db-MySQL/index.js');


app.use(bodyparser.json());



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

app.listen(PORT,console.log(`Express is running on http://localhost:${PORT}`))