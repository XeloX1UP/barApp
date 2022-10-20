const ingredientsArea = document.getElementById("ingredientsArea");
const stepsArea = document.getElementById("stepsArea");
const addBtns = document.getElementsByClassName("addBtn");
const clonStep = stepsArea.cloneNode(true);
const clonIngredient = ingredientsArea.cloneNode(true);

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
