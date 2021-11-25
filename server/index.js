
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
  db.connection.query('SELECT * FROM users',(error,results,fields)=>{
  if(error){
    res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
    //If there is error, we send the error in the error section with 500 status
} else {
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    //If there is no error, all is good and response is 200OK.
}
})
})

app.listen(PORT,console.log(`Express is running on ${PORT}`))