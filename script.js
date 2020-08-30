var head_el;
var torso_el;
var head_el;
var head_el;
var head_el;
var head_el;
var wordCon_el;
var errorMsg_el;
var popUp_el;
var wrong_el;
var ok_el;
var words;
var word;
var strArr;
var wrong;
var correct;
var correctSol;
var figCount;

var eventsInitializer = () => {
  window.addEventListener("keypress", (e) => {
    var char = e.keyCode;
    if (char < 97 || char > 122) return;
    if (
      wrong.has(String.fromCharCode(char)) ||
      correct.has(String.fromCharCode(char))
    ) {
      errorMsg_el.classList.add("visible");
      console.log(wrong);
      console.log(correct);
      setTimeout(() => {
        errorMsg_el.classList.remove("visible");
      }, 1000);
      return;
    }
    let flag = false;
    for (let i = 0; i < word.length; i++) {
      if (String.fromCharCode(char) == word[i]) {
        strArr[i] = `<div class="blanks">${word[i]}</div>`;
        correct.add(String.fromCharCode(char));
        flag = true;
      }
    }
    if (!flag) {
      wrong_el.innerHTML += ` ${String.fromCharCode(char)},`;
      wrong.add(String.fromCharCode(char));
      figCount[wrong.size - 1].classList.add("visible");
    }
    let htm = "";
    for (let s of strArr) {
      htm += s;
    }
    wordCon_el.innerHTML = htm;
    if (correctSol.size == correct.size) {
      console.log("inside");
      console.log(correctSol);
      console.log(correct);
      popUp_el.innerHTML =
        '<h3>You Won!</h3><h3>wanna try again?</h3><button type="button" class="ok" id="ok" >OK</button>';
      popUp_el.classList.add("visible");
    }
    if (wrong.size == 6) {
      popUp_el.innerHTML =
        '<h3>Sorry, better luck next time!</h3><h3>wanna try again?</h3><button type="button" class="ok" id="ok" >OK</button>';
      popUp_el.classList.add("visible");
    }

    buttonEventInit();
  });
};

var el_init = () => {
  head_el = document.getElementById("head");
  torso_el = document.getElementById("torso");
  lArm_el = document.getElementById("leftArm");
  rArm_el = document.getElementById("rightArm");
  lLeg_el = document.getElementById("leftLeg");
  rLeg_el = document.getElementById("rightLeg");
  wordCon_el = document.getElementById("wordContainer");
  errorMsg_el = document.getElementById("errMsgDiv");
  popUp_el = document.getElementById("popUp");
  wrong_el = document.getElementById("wrong");

  words = [
    "register",
    "notebook",
    "universe",
    "jupiter",
    "adaptor",
    "gyroscope",
    "bottle",
    "mirror",
    "sanitizer",
    "vaccine",
  ];
  figCount = [head_el, torso_el, lArm_el, rArm_el, lLeg_el, rLeg_el];
  strArr = [];
  wrong = new Set();
  correct = new Set();
  correctSol = new Set();
};

var buildBlanks = () => {
  let wLen = word.length;
  let str = '<div class="blanks"> </div>';
  var htm = "";
  for (let i = 0; i < wLen; i++) {
    strArr[i] = str;
  }
  for (let s of strArr) {
    htm += s;
  }
  wordCon_el.innerHTML = htm;
  console.log(word);
  for (let i = 0; i < word.length; i++) {
    correctSol.add(word[i]);
  }
};
var selectWord = () => {
  word = words[Math.floor(Math.random() * words.length)];
  let c = word[3];
  console.log(c);
  buildBlanks();
};

var buttonEventInit = () => {
  console.log("entered buttonEvent");
  ok_el = document.getElementById("ok");
  ok_el.addEventListener("click", refresh);
};

var init = () => {
  el_init();
  selectWord();
  eventsInitializer();
};

var refresh = () => {
  popUp_el.classList.remove("visible");
  wrong_el.innerHTML = "";
  for (let element of figCount) {
    element.classList.remove("visible");
  }
  wrong = new Set();
  correct = new Set();
  correctSol = new Set();
  strArr = [];
  selectWord();
};
init();
