module.exports = app => {
    const casques = require("../controllers/casque.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Casque
    router.post("/", casques.create);
  
    // Retrieve all Casques
    router.get("/", casques.findAll);
  
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Casque with id
    router.get("/:id", casques.findOne);
  
    // Update a Casque with id
    router.put("/:id", casques.update);
  
    // // Delete a Casque with id
    router.delete("/:id", casques.delete);
  
    // // Delete all Casques
    router.delete("/", casques.deleteAll);
  
    app.use('/api/casques', router);
  };