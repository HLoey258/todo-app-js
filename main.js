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
    Swal.fire({
      title: "Empty task",
      text: "Oops, something went wrong",
      icon: "error",
    });
    return false;
  } else if (todos.some((todo) => todo.todo === todoName)) {
    Swal.fire({
      title: "This task already exist",
      text: "Oops, something went wrong",
      icon: "warning",
    });
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
  // testing branch
};

//handle remove todo
const removeTodo = (index) => {
  if (!todos[index]) {
    Swal.fire({
      title: "Task not found",
      text: "Oops, something went wrong",
      icon: "error",
    });
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
      if (!todoInput.hasAttribute("data-index")) {
        const todoName = todoInput.value;
        addTodo(todoName);
      } else {
        Swal.fire({
          title: "Click save to update",
          text: "That thing is still around?",
          icon: "warning",
        });
      }
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
  if (todoNumber != 0) {
    todoProgress.innerHTML = `<p>0</p>`;
  }
  todoProgress.innerHTML = todoNumber
    ? `<p>${todoDone}/${todoNumber}</p>`
    : `<p>${todoDone}</p>`;
};

// sweater
