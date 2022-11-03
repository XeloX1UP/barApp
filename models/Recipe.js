const { Schema, model } = require("mongoose");

const recipeModel = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    origin: {
      type: String,
      require: true,
    },
    portions: {
      type: Number,
      require: true,
    },
    ingredients: [
      {
        ingredient: {
          type: String,
          require: true,
        },
        cant: {
          type: Number,
          require: true,
        },
        metric: {
          type: String,
          require: true,
        },
      },
    ],
    steps: [
      {
        step: {
          type: Number,
          require: true,
        },
        description: {
          type: String,
          require: true,
        },
      },
    ],
    imageRoute: {
      type: String,
      require: true,
    },
    recipeStatus: {
      type: Number,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Recipe", recipeModel);
