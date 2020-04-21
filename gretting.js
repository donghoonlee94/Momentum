const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  todoInputForm = document.querySelector(".js-toDoForm"),
  todoListInput = todoInputForm.querySelector("input");
  
const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(value) {
  localStorage.setItem(USER_LS, value);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  console.log('1',currentValue);
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName () {
  form.classList.add(SHOWING_CN);
  addEventListener('submit', handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `안녕하세요! ${text} 님, 오늘도 좋은 하루 보내세요.`;
  todoListInput.style.display = 'block';   
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
    todoListInput.style.display = 'none';
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
  input.addEventListener("focus", function() {
    input.value = "";
  })
  todoListInput.addEventListener("focus", function () {
    todoListInput.value = "";
  })
  todoListInput.addEventListener("blur", function () {
    todoListInput.value = '오늘은 무엇을 하실건가요?';
  })
}

init();