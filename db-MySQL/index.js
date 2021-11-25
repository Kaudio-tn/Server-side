const mysql = require("mysql");
const mysqlConfig = require("./config.js");

var connection = mysql.createConnection(mysqlConfig);
 connection.connect((err)=> {
    if(!err)
    console.log('Connection DB Established Successfully');
    else
    console.log('Connection DB Failed!'+ JSON.stringify(err,undefined,2));
    });

// const findAndUpdate = function () {};


// const create = function (params, callback) {
//   const str = `INSERT INTO users (firstName, lastName, email, guest) VALUES (?,?,?,?)`;
//   connection.query(str, params, (err, result) => {
//     // return err ? callback(err, null): callback(null, result)
//     if (err) {
//       console.log(err);
//     }
//     callback(err, result);
//   });
// };

// module.exports = {
//     findAndUpdate,
//     create,
// };

const getAllUsers = function(req,res) {
    // let syn =`select * from users`
    // connection.query(syn,(err,result)=>{
    //   return  err ? callback(err,null) : callback(null,result)
    // })
    connection.query('SELECT * FROM users',(error,results,fields)=>{
        if(error){
          res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
          //If there is error, we send the error in the error section with 500 status
      } else {
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
          //If there is no error, all is good and response is 200OK.
      }
      })



};

module.exports={connection:connection,getAllUsers : getAllUsers};


