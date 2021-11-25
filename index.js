
const express = require('express')
const app = express()
const PORT = 3000;



app.get('/', (req,res)=> { //get method
  res.send('Hello World') //send response
})
app.listen(PORT)