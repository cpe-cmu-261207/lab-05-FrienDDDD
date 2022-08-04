const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;

  if (inputAdd.value === "") {
    alert("todo cannot be empty");
  }
  addTodo(inputAdd.value, false);
  inputAdd.value = "";

  saveTodo();
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  todoCtn.prepend(div);
  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);

  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };

  doneBtn.onclick = () => {
    if (span.style.textDecoration === "line-through") {
      span.style.textDecoration = "none";
    } else {
      span.style.textDecoration = "line-through";
    }
    saveTodo();
  };
  deleteBtn.style.display = "none";
  doneBtn.style.display = "none";
  div.onmouseover = () => {
    deleteBtn.style.display = "";
    doneBtn.style.display = "";
  };
  div.onmouseout = () => {
    deleteBtn.style.display = "none";
    doneBtn.style.display = "none";
  };
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    const todoObj = {};
    todoObj.title = todoDiv.children[0].innerText;
    todoObj.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    data.unshift(todoObj);
  }
  const dataStr = JSON.stringify(data);
  localStorage.setItem("todo list", dataStr);
}

function loadTodo() {
  const dataStr = localStorage.getItem("todo list");
  const data = JSON.parse(dataStr);

  for (const todoObj of data) {
    addTodo(todoObj.title, todoObj.completed);
  }
}

loadTodo();
