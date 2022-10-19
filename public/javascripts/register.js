console.log("funcionando");
const inputs = document.getElementsByClassName("register-inputs");

const obtenerValores = (inputs) => {
  const valores = [];
  for (let input of inputs) {
    let val = input.value;
    valores.push({
      val: val.trim().toLowerCase(),
    });
  }
  return valores;
};
const inputsFormat = (inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = obtenerValores(inputs)[i].val;
  }
};

const form = document.getElementById("frmRegister");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputsFormat(inputs);
  form.submit();
});
