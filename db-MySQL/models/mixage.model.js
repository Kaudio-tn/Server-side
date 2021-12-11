const sql = require("../index.js");

// constructor
const Mixage = function(mixage) {
  this.name = mixage.name;
  this.description = mixage.description;
  this.isavailable = mixage.isavailable;
  this.price = mixage.price;
  this.quantity = mixage.quantity;
  this.imgurl = mixage.imgurl;
};

Mixage.create = (newMixage, result) => {
  sql.connection.query("INSERT INTO mixages SET ?", newMixage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created mixage: ", { id: res.insertId, ...newMixage });
    result(null, { id: res.insertId, ...newMixage });
  });
};

Mixage.findById = (id, result) => {
  sql.connection.query(`SELECT * FROM mixages WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found mixage: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Mixage with the id
    result({ kind: "not_found" }, null);
  });
};

Mixage.getAll = (name, result) => {
  let query = "SELECT * FROM mixages";

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

Mixage.updateById = (id, mixage, result) => {
  sql.connection.query(
    "UPDATE mixages SET name = ?, description = ?, isavailable = ? , price = ? , quantity = ?, imgurl = ? , ref = ?  WHERE id = ?",
    [mixage.name, mixage.description, mixage.isavailable,mixage.price,mixage.quantity,mixage.imgurl,mixage.ref, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Mixage with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated mixage: ", { id: id, ...mixage });
      result(null, { id: id, ...mixage });
    }
  );
};

Casque.remove = (id, result) => {
  sql.connection.query("DELETE FROM mixages WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Mixage with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted mixage with id: ", id);
    result(null, res);
  });
};

Mixage.removeAll = result => {
  sql.connection.query("DELETE FROM mixages", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} mixages`);
    result(null, res);
  });
};

module.exports = Mixage;