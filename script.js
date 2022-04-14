const wrapper = document.querySelector(".wrapper");
const searchInput = wrapper.querySelector("input");
const infoText = wrapper.querySelector(".info-text");

// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  infoText.innerHTML = `Searching the meaning of <spa>"${word}"</spa>`;
}

//event listeners
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    fetchApi(e.target.value);
  }
});
