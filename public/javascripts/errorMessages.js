const messageArea = document.getElementById("messageArea");
const closeEvent = (e) => {
  e.target.parentNode.style.display = "none";
};
if (messageArea) {
  for (let message of messageArea.children) {
    message.children[0].addEventListener("click", (e) => closeEvent(e));
  }
}
