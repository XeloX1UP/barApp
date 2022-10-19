const findLikeName = (name) => {
  let nom = name;
  return fetch(`/buscar/recipe/${nom}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.error("error - ", err));
};
const viewAllRecipes = () => {
  return fetch("/buscar/all")
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.error(err));
};
const fillCards = async (name) => {
  const recipes =
    name != "" ? await findLikeName(name) : await viewAllRecipes();
  const cntCards = document.getElementById("cntCards");
  cntCards.innerHTML = "";
  recipes.forEach((recipe) => {
    cntCards.innerHTML += `
    <div class="cntBarCard" id="cntBarCard">
      <div id="cardImage">
        <img src="/images/barCards/${recipe.imageRoute}" />
      </div>
      <div id="titulo" class="txt">
        Nombre: <span id="nombre">${recipe.name}</span>
      </div>
      <div id="porciones" class="txt">
        Porciones: <span id="origen">${recipe.portions}</span>
      </div>
      <div id="ingredientes" class="txt">
        Ingredientes: <span id="origen">${recipe.ingredients.length}</span>
      </div>
      <div id="origen" class="txt">
        Origen: <span id="origen">${recipe.origin}</span>
      </div>
    </div>
  `;
  });
};

const inputRecipeName = document.getElementById("inputNameRecipe");
const btnBuscar = document.getElementsByClassName("buscarIcon")[0];
btnBuscar.addEventListener("click", async () => {
  let nameToFind = inputRecipeName.value;
  if (nameToFind != "") fillCards(nameToFind);
});
inputRecipeName.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    let nameToFind = inputRecipeName.value;
    if (nameToFind != "") fillCards(nameToFind);
  }
});

const btnViewAllRecipes = document.getElementById("btnViewAllRecipes");
btnViewAllRecipes.addEventListener("click", () => fillCards(""));
