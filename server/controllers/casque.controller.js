const Casque = require("../../db-MySQL/models/casque.model.js");

console.log(Casque)
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
};
 // Create a Casque
 const casque = new Casque({
    name: req.body.name,
    description: req.body.description,
    isavailable: req.body.isavailable || false,
    quantity : req.body.quantity,
    price : req.body.price,
    imgurl : req.body.imgurl
  });
// Save Casque in the database
Casque.create(casque, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Casque."
      });
    else res.send(data);
  });
};



// Retrieve all Tutorials from the database (with condition).
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
    Casque.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Casque with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Casque with id " + req.params.id
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
  
    Casque.updateById(
      req.params.id,
      new Casque(req.body),
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

  
  //Delete a Casque with the specified id in the request:

exports.delete = (req, res) => {
  Casque.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Casque with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Casque with id " + req.params.id
        });
      }
    } else res.send({ message: `Casque was deleted successfully!` });
  });
};

//Delete all Tutorials from the database:

exports.deleteAll = (req, res) => {
  Casque.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all casques."
      });
    else res.send({ message: `All Casques were deleted successfully!` });
  });
};