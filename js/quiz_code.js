window.onload = function() {
  let result = {};
  let step = 0;
  function showQuestion(questionNumber) {
    document.querySelector(".question").innerHTML = quiz[step]["q"];
    let answer = "";
    for (let key in quiz[step]["a"]) {
      answer += `<li data-v='${key}' class="answer-variant">${quiz[step]["a"][key]}</li>`;
    }
    document.querySelector(".answer").innerHTML = answer;
  }

  document.onclick = function(event) {
    event.stopPropagation();
    if (
      event.target.classList.contains("answer-variant") &&
      step < quiz.length
    ) {
      // event.target.data
      if (result[event.target.dataset.v] != undefined) {
        result[event.target.dataset.v]++;
      } else {
        result[event.target.dataset.v] = 0;
      }
      step++;
      if (step == quiz.length) {
        document.querySelector(".question").remove();
        document.querySelector(".answer").remove();
        showResult();
      } else {
        showQuestion();
      }
    }
    if (event.target.classList.contains("reload-button")) {
      location.reload();
    }
  };

  function showResult() {
    document.querySelector(".folse").className = "answer-window";

    let key = Object.keys(result).reduce(function(a, b) {
      return result[a] > result[b] ? a : b;
    });

    let link = answers[key]["link"];
    document.querySelector(".answer-link").setAttribute("href", link);

    let titleResult = document.createElement("h2");
    titleResult.classList.add("title-result");
    titleResult.innerHTML = answers[key]["title"];
    document.querySelector(".answer-text").appendChild(titleResult);

    let div = document.createElement("div");
    div.classList.add("result");
    div.innerHTML = answers[key]["description"];
    document.querySelector(".answer-text").appendChild(div);

    let img = document.createElement("img");
    img.src = "img/" + answers[key]["image"];
    img.classList.add("result-img");
    document.querySelector(".answer-link").appendChild(img);

    let reloadButton = document.createElement("a");
    reloadButton.innerHTML = "ПУСТИ МЕНЯ ПО КРУГУ";
    reloadButton.classList.add("reload-button");
    document.querySelector(".answer-btn").appendChild(reloadButton);
    document.querySelector(".reload-button").setAttribute("href", "#");

    let exetButton = document.createElement("a");
    exetButton.innerHTML = "уйти нахуй";
    exetButton.classList.add("exet-game");
    document.querySelector(".answer-btn").appendChild(exetButton);
    document
      .querySelector(".exet-game")
      .setAttribute("href", "https://natribu.org/ru/");
  }

  showQuestion();
};
