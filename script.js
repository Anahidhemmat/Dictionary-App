const wrapper = document.querySelector(".wrapper");
const searchInput = wrapper.querySelector("input");
const infoText = wrapper.querySelector(".info-text");
const ul = document.querySelector("ul");
const synonyms = wrapper.querySelector(".synonyms .list");
let audio = document.createElement("audio");
const volumeIcon = wrapper.querySelector(".word i");

//data function
function data(result, word) {
  if (result.title) {
    infoText.innerHTML = `Cant't find the meaning of <span>"${word}"</span>. Please try to search for another word.`;
  } else {
    console.log(result);
    ul.classList.add("active");
    infoText.style.display = "none";
    let definitions = result[0].meanings[0].definitions;
    let phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`;

    // response

    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phonetics;
    document.querySelector(".meaning span").innerText =
      definitions[0].definition;
    document.querySelector(".example span").innerText =
      result[0].meanings[1].definitions[0].example;
    // audio = new Audio(result[0].phonetics[0].audio);
    // console.log(audio);
    audio.src = result[0].phonetics[2].audio;

    if (result[0].meanings[0].synonyms[0] == undefined) {
      synonyms.parentElement.style.display = "none";
    } else {
      synonyms.parentElement.style.display = "block";
      synonyms.innerHTML = "";

      for (let i = 0; i < 5; i++) {
        let tag = document.createElement("span");
        tag.innerText = result[0].meanings[0].synonyms[i];
        synonyms.insertAdjacentElement("beforeend", tag);
        tag.addEventListener("click", () => {
          searchInput.value = tag.innerText;
          fetchApi(tag.innerText);
        });
      }
    }
  }
}

//search synonyms function
// function search(word) {
//   searchInput.value = word;
//   fetchApi(word);
// }
// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  infoText.innerHTML = `Searching the meaning of <spa>"${word}"</spa>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}

//event listeners
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    fetchApi(e.target.value);
  }
});

volumeIcon.addEventListener("click", () => {
  audio.play();
});
