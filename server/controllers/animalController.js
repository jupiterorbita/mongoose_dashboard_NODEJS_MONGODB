//controller for routes

var mongoose = require("mongoose");
var Animal = mongoose.model("Animal");

module.exports = {
  
    // ============= INDEX =====================
  index: function(req, res) {
    console.log("============ index ============");
    Animal.find({}, function(err, animals) {
      if (err) {
        return res.json(err);
      }
      return res.render("index", { animals: animals });
    });
  },
  
  // =========== GET /mongooses/new ejs ===============
  show_animal: function(req, res) {
    console.log("============== render NEW ============");
    res.render("new");
  },
  
  // ============ GET /mongooses/id about/info ejs ==========
  info_animal: function(req, res) {
    console.log(">>> SERVER > /mongoose/info");
    console.log("id =>", req.params.id);
    Animal.findOne({ _id: req.params.id }, function(err, animal) {
      console.log("============== find =>", animal); // the object returned that found
      if (err) {
        console.log("error retrieving animal =>", err);
      } else {
        res.render("info", { animal: animal });
      }
    });
  },
  
  // ========== POST /mongooses ======================
  create_new_animal: function(req, res) {
    var animalInstance = new Animal({
      name: req.body.name
    });
    animalInstance.save(function(err) {
      if (err) {
        console.log("we have an error", err);
        for (var key in err.errors) {
          req.flash("registration", err.errors[key].message);
        }
        res.redirect("/mongooses/new");
      } else {
        console.log("successfully added a user!");
        res.redirect("/");
      }
    });
  },
  
  // =========== GET  EDIT  /mongooses/edit/id ejs =============
  edit_animal: function(req, res) {
    console.log("==== EDIT ====");
    console.log(req.params.id);
    res.render("edit", { id: req.params.id });
  },
  
  // =========== POST  EDIT  /mongooses/edit/id METHOD ============
  edit_animal_method: function(req, res) {
    Animal.findOne({ _id: req.params.id }, function(err, animals) {
      animals.name = req.body.name;
      animals.save(function(err) {
        res.redirect("/");
      });
    });
  },
  
  // =========== GET /mongooses/destroy/id METHOD ==========
  destroy_animal: function(req, res) {
    console.log(req.params.id);
    Animal.remove({ _id: req.params.id }, function(err) {});
    console.log("DELETEING USER");
    res.redirect("/");
  }
};
