const getSteps = (stepslist) => {
  // console.log(typeof stepslist);

  if (typeof stepslist == "object") {
    let steps = [];
    let count = 1;
    stepslist.forEach((step) => {
      if (step != "") {
        steps.push({
          step: count++,
          description: step,
        });
      }
    });
    return steps.length > 0
      ? steps
      : {
          step: "",
          description: "",
        };
  }
  return [{ step: 1, description: stepslist }];
};
const getIngredients = (ingredient, cant, metric) => {
  if (typeof ingredient == "object") {
    let ingredients = [];
    ingredient.forEach((item, i) => {
      if (ingredient[i] != "" && cant[i] != "") {
        ingredients.push({
          ingredient: ingredient[i].trim().toLowerCase(),
          cant: cant[i].trim().toLowerCase(),
          metric: metric[i].trim().toLowerCase(),
        });
      }
    });

    return ingredients.length > 0
      ? ingredients
      : {
          ingredient: "",
          cant: "",
          metric: "",
        };
  } else {
    ingredient = ingredient.trim().toLowerCase();
    cant = cant.trim().toLowerCase();
    metric = metric.trim().toLowerCase();
    return [
      {
        ingredient,
        cant,
        metric,
      },
    ];
  }
};
const validateText1 = (text) => {
  text = text.trim().toLowerCase();
  let regExp = /^[a-zA-Z\s]{3,20}$/i;
  if (!regExp.test(text)) return "";
  return text;
};
const validatePortions = (portions) => {
  let regExp = /^[1-9]{1,2}$/;
  if (!regExp.test(portions)) return "";
  return portions;
};
const validList = (value, rgex) => {
  if (typeof value == "object") {
    value.forEach((item) => {
      if (!rgex.test(item)) return "";
    });
    return value;
  }
  if (!rgex.test(value)) return "";
  return value;
};
const validateIngredientCant = (cant) => {
  let regExp = /^[1-9]{1,2}$/;
  return validList(cant, regExp);
};
const validateMetric = (metric) => {
  let regex = /(onza|mililitro|vaso|unidad)/i;
  return validList(metric, regex);
};
const validateIngredient = (ingredient) => {
  let regex = /^[a-zA-Z\s]{3,15}$/i;
  return validList(ingredient, regex);
};
const validateStep = (step) => {
  let regex = /^[a-zA-Z0-9\s.-]{4,100}$/i;
  return validList(step, regex);
};
const validateImageRoute = (route) => {
  return route;
};
const validateValues = (body) => {
  body.recipeName = validateText1(body.recipeName);
  body.recipeOrigin = validateText1(body.recipeOrigin);
  body.recipePortions = validatePortions(body.recipePortions);
  body.recipeIngredientCant = validateIngredientCant(body.recipeIngredientCant);
  body.recipeIngredient = validateIngredient(body.recipeIngredient);
  body.recipeIngredientMetric = validateMetric(body.recipeIngredientMetric);
  body.step = validateStep(body.step);
  body.imageRoute = validateImageRoute(body.imageRoute);
  return body;
};
module.exports = {
  getRecipe: (body, author) => {
    let {
      recipeName,
      recipeOrigin,
      recipePortions,
      recipeIngredientCant,
      recipeIngredient,
      recipeIngredientMetric,
      step,
      imageRoute,
    } = validateValues(body);
    return {
      name: recipeName,
      origin: recipeOrigin,
      portions: recipePortions,
      ingredients: getIngredients(
        recipeIngredient,
        recipeIngredientCant,
        recipeIngredientMetric
      ),
      steps: getSteps(step),
      imageRoute,
      recipeStatus: 0,
      author,
    };
  },
};
