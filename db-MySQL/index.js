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

const getOneUser = function(req,res) {

    connection.query('SELECT * FROM users WHERE id=?',[req.params.id],(error,results,fields)=>{
        if(error){
          res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
          //If there is error, we send the error in the error section with 500 status
      } else {
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
          //If there is no error, all is good and response is 200OK.
      }
 })
};

const delOneUser = function(req,res) {

    connection.query('DELETE users WHERE id=?',[req.params.id],(error,results,fields)=>{
        if(error){
          res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
          //If there is error, we send the error in the error section with 500 status
      } else {
          res.send('Deleted successfully');
          //If there is no error, all is good and response is 200OK.
      }
 })
};

const createUser = function(req,res) {
    let usr = req.body;
    var sql = "SET @id = ?;SET @firstName = ?; SET @lastName = ? ; SET @email = ?; \ CALL usersAddOrEdit(@id,@firstName,@lastName,@email);"
    connection.query(sql,[usr.id,usr.firstName,usr.lastName,usr.email],(error,results,fields)=>{
        if(error){
          res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
          //If there is error, we send the error in the error section with 500 status
      } else {
        //   res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
          //If there is no error, all is good and response is 200OK.
          results.forEach(element => {
              if (element.constructor== Array)
              res.send('Inserted user id : '+element[0].usr.id)
          });
      }
 })
};

module.exports={connection:connection,getAllUsers : getAllUsers,createUser:createUser,getOneUser:getOneUser,delOneUser:delOneUser};


