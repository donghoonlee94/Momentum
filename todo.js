const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  // event.target은 해당 이벤트가 등록된 것(태그 등)을 담게됨. btn에 <button></button> 이 담길 것.
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter( todo => todo.id !== parseInt(li.id) );
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  // LocalStorage는 String으로만 저장이 됨. 자바스크립트 표현법으로 저장이 되지 않아 객체를 전달하면 Object Object로 되기 때문에 
  // JavaScript Object Notation, JSON.stringify를 통해 객체를 String으로 변환하여 저장을 해줘야함. 이후 JSON.parse() 를 통해 다시 오브젝트로 변환.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  // createElement로 태그 생성 
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  // 생성되는 button에 click 이벤트 등록
  delBtn.addEventListener('click', deleteToDo);  
  span.innerText = text;
  // appendChild로 대상의 자식으로 태그를 삽입
  li.appendChild(span);
  li.appendChild(delBtn);  
  li.id = newId;
  toDoList.appendChild(li);
  // LocalStorage 저장하기 위해 Object를 생성
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  // LocalStorage Key가 'toDos' 인 것이 있다면 loadedTodos에 저장.
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // JSON.stringify()로 string 화 한 객체를 다시 JSON.parse() 로 객체로 변환 시킴.
    const parsedToDos = JSON.parse(loadedToDos);
    // forEach는 안에 값을 하나 하나 함수로 실행시킴. array function이며, 파라미터로 받는 대상은 부르는 변수의 내용이 됨. 아래는 parsedTodos의 객체들을 파라미터로 받아서 하나 하나 실행을 하게 됨.
    parsedToDos.forEach( todo => paintToDo(todo.text));
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();