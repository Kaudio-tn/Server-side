const Mixage = require("../../db-MySQL/models/mixage.model.js");

console.log(mixage)
// Create and Save a new Mixage
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
};
 // Create a Mixage
 const mixage = new Mixage({
    name: req.body.name,
    description: req.body.description,
    isavailable: req.body.isavailable || false,
    quantity : req.body.quantity,
    price : req.body.price,
    imgurl : req.body.imgurl
  });
// Save Mixage in the database
Mixage.create(casque, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Casque."
      });
    else res.send(data);
  });
};



// Retrieve all Mixages from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;

    Casque.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving casques."
        });
      else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Mixage.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Mixage with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Mixage with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };


//update 
  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Mixage.updateById(
      req.params.id,
      new Mixage(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Casque with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Casque with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

  
  //Delete a Mixage with the specified id in the request:

exports.delete = (req, res) => {
  Mixage.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Mixage with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Mixage with id " + req.params.id
        });
      }
    } else res.send({ message: `Mixage was deleted successfully!` });
  });
};

//Delete all Mixages from the database:

exports.deleteAll = (req, res) => {
  Mixage.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all mixages."
      });
    else res.send({ message: `All Mixages were deleted successfully!` });
  });
};