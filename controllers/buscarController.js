const RecipeModel = require("../models/Recipe");
const escapeString = require("escape-string-regexp");
const controller = {};
controller.buscarIndex = (req, res, next) => {
  const auth = req.session.auth;
  res.render("buscar/index", {
    styleSheets: [
      {
        styleSheet: "buscar",
      },
    ],
    auth,
  });
};
controller.getRecipes = async (req, res, next) => {
  try {
    const recipes = await RecipeModel.find({});
    res.json(recipes);
  } catch (err) {
    console.log(err);
  }
};
controller.getSpecificRecipe = async (req, res, next) => {
  try {
    const { name } = req.params;
    const $regex = escapeString(name);
    const $options = "i";
    const recipes = await RecipeModel.find(
      { name: { $regex, $options } },
      "name portions ingredients origin imageRoute"
    );
    recipes.length > 0 ? res.json(recipes) : res.json([]);
  } catch (err) {
    console.error(err);
  }
};
controller.createRecipe = async (req, res, next) => {
  const { name, origin, portions, ingredients, steps, imageRoute } = req.body;
  new RecipeModel({
    name,
    origin,
    portions,
    ingredients,
    steps,
    imageRoute,
  });
  res.json([{ message: "Receta creada" }]);
};

module.exports = controller;
