const sql = require("../index.js");

// constructor
const Casque = function(casque) {
  this.name = casque.name;
  this.description = casque.description;
  this.isavailable = casque.isavailable;
  this.price = casque.price;
  this.quantity = casque.quantity;
  this.imgurl = casque.imgurl;
};

Casque.create = (newCasque, result) => {
  sql.connection.query("INSERT INTO casques SET ?", newCasque, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created casque: ", { id: res.insertId, ...newCasque });
    result(null, { id: res.insertId, ...newCasque });
  });
};

Casque.findById = (id, result) => {
  sql.connection.query(`SELECT * FROM casques WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found casque: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Casque with the id
    result({ kind: "not_found" }, null);
  });
};

Casque.getAll = (name, result) => {
  let query = "SELECT * FROM casques";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.connection.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("casques: ", res);
    result(null, res);
  });
};

// Tutorial.getAllPublished = result => {
//   sql.connection.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };

Casque.updateById = (id, casque, result) => {
  sql.connection.query(
    "UPDATE casques SET name = ?, description = ?, isavailable = ? , price = ? , quantity = ?, imgurl = ? , ref = ?  WHERE id = ?",
    [casque.name, casque.description, casque.isavailable,casque.price,casque.quantity,casque.imgurl,casque.ref, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Casque with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated casque: ", { id: id, ...casque });
      result(null, { id: id, ...casque });
    }
  );
};

Casque.remove = (id, result) => {
  sql.connection.query("DELETE FROM casques WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Casque with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted casque with id: ", id);
    result(null, res);
  });
};

Casque.removeAll = result => {
  sql.connection.query("DELETE FROM casques", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} casques`);
    result(null, res);
  });
};

module.exports = Casque;