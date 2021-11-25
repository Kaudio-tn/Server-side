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

const getAllUsers = function(callback) {
    let syn =`select * from users`
    connection.query(syn,(err,result)=>{
      return  err ? callback(err,null) : callback(null,result)
    })
};

module.exports={connection:connection,getAllUsers : getAllUsers};


