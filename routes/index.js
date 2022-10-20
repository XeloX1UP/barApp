var express = require("express");
const controller = require("../controllers/buscarController.js");
var router = express.Router();
var buscarController = require("../controllers/buscarController.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Recetas bartenders",
    auth: req.session.auth,
  });
});
// Index buscar
router.get("/buscar", buscarController.buscarIndex);

// Api Recipes
// get allRecipes JSON
router.get("/buscar/all", buscarController.getRecipes);
// get recipes LIKE :name JSON
router.get("/buscar/recipe/:name", controller.getSpecificRecipe);
// post createRecipe
router.post("/recipes/create", controller.createRecipe);

module.exports = router;
