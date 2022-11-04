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
const valid = {
  nombre: false,
  origen: false,
  porcion: false,
  cantidad: false,
  ingrediente: false,
  paso: false,
};
const expresion = {
  nombre: /^[a-zA-Z\s]{4,35}$/,
  origen: /^[a-zA-Z\s]{3,35}$/,
  porcion: /^[1-9]{1}$/,
  cantidad: /^[1-9]{1,3}$/,
  ingrediente: /^[a-zA-Z\s]{3,35}$/,
  paso: /^[a-zA-Z0-9,.-_\s]{6,200}$/,
};
const validarCampo = (input, regEx, campo) => {
  if (regEx.test(input.value)) {
    valid[campo] = true;
    input.classList.remove("error");
  } else {
    valid[campo] = false;
    input.classList.add("error");
  }
};
const validarFormulario = (e) => {
  switch (e.target.name) {
    case "recipeName":
      validarCampo(e.target, expresion.nombre, "nombre");
      break;
    case "recipeOrigin":
      validarCampo(e.target, expresion.origen, "origen");
      break;
    case "recipePortions":
      validarCampo(e.target, expresion.porcion, "porcion");
      break;
    case "recipeIngredientCant":
      validarCampo(e.target, expresion.cantidad, "cantidad");
      break;
    case "recipeIngredient":
      validarCampo(e.target, expresion.ingrediente, "ingrediente");
      break;
    case "step":
      validarCampo(e.target, expresion.paso, "paso");
      break;
  }
};

const inputs = document.querySelectorAll(".formNewDrink .input");
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  // e.target.parentElement.submit();
});
