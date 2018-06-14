//routes
var animalController = require('../controllers/animalController.js')

module.exports = function(app) {
  app.get("/", animalController.index);

  app.get("/mongooses/new", animalController.show_animal);

  app.get("/mongooses/:id", animalController.info_animal);

  app.post("/mongooses", animalController.create_new_animal);

  app.get("/mongooses/edit/:id", animalController.edit_animal);

  app.post("/mongoose/edit/:id", animalController.edit_animal_method);

  app.get("/mongooses/destroy/:id", animalController.destroy_animal);
};
