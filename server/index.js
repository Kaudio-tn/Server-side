
const express = require('express')
const bodyparser = require('body-parser');
var app = express()
const PORT = 3000;
const db = require('../db-MySQL/index.js');
console.log(db)

app.use(bodyparser.json());



app.get('/', (req,res)=> { //get method
  res.send('Hello World') //send response
})


app.get('/users', (req,res)=> { //get method
  db.getAllUsers(req,res)
})

app.listen(PORT,console.log(`Express is running on ${PORT}`))