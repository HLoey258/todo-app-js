const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var todos = [];

const todoInput = document.querySelector(".todo-input");
const todoProgress = document.querySelector(".todo-progress");
const submitTodo = document.querySelector("#todo-submit");
const todoList = document.querySelector(".todo-list");

// check valid todo
const checkTodo = (todoName) => {
  if (!todoName) {
    alert("Please fill in");
    return false;
  } else if (todos.some((todo) => todo.todo === todoName)) {
    alert("This to do already exist");
    return false;
  } else {
    return true;
  }
};
// handle add todo
const addTodo = (todoName) => {
  if (checkTodo(todoName)) {
    todos.unshift({
      todo: todoName,
      status: false,
    });
    renderTodoList();
    Swal.fire({
      title: "Great!",
      text: "You have added one task",
      icon: "success",
    });
    todoInput.value = "";
  }
};

//handle remove todo
const removeTodo = (index) => {
  if (!todos[index]) {
    alert("Task not found");
  }
  todos.splice(index, 1);
  renderTodoList();
};

// handle edit todo
const editTodo = (index) => {
  todoInput.setAttribute("data-index", index);
  todoInput.value = todos[index].todo;
  submitTodo.innerHTML = `<i class="fa-regular fa-floppy-disk"></i>`;
};

// toggle status
const toggleTodo = (index) => {
  const todo = todos[index];
  todo.status = !todo.status;
  renderTodoList();
};

// handle add todo when press enter
const handleKeyPress = (event) => {
  if (todoInput.value != "")
    if (event.key === "Enter") {
      const todoName = todoInput.value;
      addTodo(todoName);
    }
};
window.addEventListener("keypress", handleKeyPress);

// Handle submit todo
submitTodo.addEventListener("click", () => {
  const todoName = todoInput.value;
  const isEditting = todoInput.hasAttribute("data-index");
  if (!checkTodo(todoName)) {
    return;
  } else if (isEditting) {
    const index = todoInput.getAttribute("data-index");
    const todoEditing = todos[index];
    todoEditing.todo = todoName;
    submitTodo.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    todoInput.removeAttribute("data-index");
    todoInput.value = "";
    renderTodoList();
  } else {
    addTodo(todoName);
  }
});

// Render todo list
const renderTodoList = () => {
  todoList.innerHTML = ``;
  todos.forEach((todoName, todoIndex) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-list-item");
    todoItem.innerHTML = `     
        <div class="todo-checkbox">
          <input type="checkbox" ${
            todoName.status ? "checked" : ""
          } onClick="toggleTodo(${todoIndex})"/>
          <p class="${todoName.status ? "todo-checked" : ""}">
            ${todoName.todo}
          </p>
        </div>
        <div class="todo-action">
          <button id="todo-edit" onclick="editTodo(${todoIndex})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button id="todo-remove" onclick="removeTodo(${todoIndex})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
    `;
    todoList.appendChild(todoItem);
  });
  const todoNumber = todos.length;
  const todoDone = todos.filter((todo) => todo.status === true).length;
  todoProgress.innerHTML = todoNumber
    ? `<p>${todoDone}/${todoNumber}</p>`
    : `<p>${todoDone}</p>`;
};

// sweater
