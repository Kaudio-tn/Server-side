module.exports = app => {
    const mixages = require("../controllers/mixage.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Casque
    router.post("/", mixages.create);
  
    // Retrieve all mixages
    router.get("/", mixages.findAll);

    // Retrieve a single Mixage with id
    router.get("/:id", mixages.findOne);
  
    // Update a Mixage with id
    router.put("/:id", mixages.update);
  
    // // Delete a Mixage with id
    router.delete("/:id", mixages.delete);
  
    // // Delete all mixages
    router.delete("/", mixages.deleteAll);
  
    app.use('/api/mixages', router);
  };