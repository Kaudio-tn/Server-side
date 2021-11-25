
const express = require('express')
const mysql = require('mysql');
const bodyparser = require('body-parser');
const app = express()
const PORT = 3000;
const db = require('../db-MySQL/index.js');


app.use(bodyparser.json());



app.get('/', (req,res)=> { //get method
  res.send('Hello World') //send response
})
app.get('/users', (req,res)=> { //get method
db.query('SELECT * FROM Users',(err,rows,fields)=>{
  if(!err) console.log(rows)
  else console.log(err)
})
})

app.listen(PORT,console.log(`Express is running on ${PORT}`))