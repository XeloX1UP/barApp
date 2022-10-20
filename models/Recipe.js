const { Schema, model } = require("mongoose");

const recipeModel = new Schema(
  {
    name: String,
    origin: String,
    portions: Number,
    ingredients: [{ ingredient: String, cant: Number, metric: String }],
    steps: [{ step: Number, description: String }],
    imageRoute: String,
    recipeStatus: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Recipe", recipeModel);
