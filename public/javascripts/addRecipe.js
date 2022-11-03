const ingredientsArea = document.getElementById("ingredientsArea");
const stepsArea = document.getElementById("stepsArea");
const addBtns = document.getElementsByClassName("addBtn");
const clonStep = stepsArea.cloneNode(true);
const clonIngredient = ingredientsArea.cloneNode(true);
const btnSubmit = document.getElementById("btnSubmit");

let stepCount = 1;

const addIngredient = (e) => {
  const ingredientFS = e.target.parentElement.parentElement;
  const ingredient = clonIngredient.cloneNode(true);
  ingredientFS.appendChild(ingredient);
  removeButton(e.target);
  addFunctionIngredient(ingredient.children[4]);
};
const removeButton = (button) => {
  button.parentElement.removeChild(button);
};
const addFunctionStep = (button) => {
  button.addEventListener("click", (e) => addStep(e));
};
const addFunctionIngredient = (button) => {
  button.addEventListener("click", (e) => addIngredient(e));
};
const addStep = (e) => {
  const stepFS = e.target.parentElement.parentElement;
  const step = clonStep.cloneNode(true);
  step.children[0].innerText = `${(stepCount += 1)}.-`;
  stepFS.appendChild(step);
  removeButton(e.target);
  addFunctionStep(step.children[2]);
};

addFunctionIngredient(addBtns[0]);
addFunctionStep(addBtns[1]);

const getFormData = () => {
  const data = {};
  data.name = document.getElementById("recipeName").value;
  data.origin = document.getElementById("recipeOrigin").value;
  data.portions = document.getElementById("recipePortions").value;
  data.ingredients = newArrayFromCollection(
    document.getElementsByClassName("ingredientsArea")
  );
  data.steps = newArrayFromCollection(
    document.getElementsByClassName("stepsArea")
  );
  data.imageRoute = document.getElementById("image");
  return data;
};

const newArrayFromCollection = (collection) => {
  let list = Array.from(collection);
  if (collection[0].id == "ingredientsArea") {
    list = list.map((div) => ({
      cant: div.children[0].value.trim(),
      metric: div.children[1].value.trim(),
      ingredient: div.children[3].value.trim(),
    }));
    return list;
  } else if (collection[0].id == "stepsArea") {
    list = list.map((div) => ({
      step: div.children[0].innerText.trim().replace(".", "").replace("-", ""),
      description: div.children[1].value.trim(),
    }));
    return list;
  }
  return list;
};

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  // const data = getFormData();
  e.target.parentElement.submit();
  // const req = new XMLHttpRequest();
  // req.open("POST", "/admin/newRecipe", true);
  // req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // req.send(JSON.stringify(data));
});
