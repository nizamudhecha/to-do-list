let input = document.querySelector(".todovalue");
let btn = document.querySelector(".btn");
let incompleteBox = document.querySelector(".incomplete .list ul");
let completeBox = document.querySelector(".complete .list ul");
let error = document.querySelector(".label");

const addList = (e) => {
  e.preventDefault();

  let todo = input.value.trim();
  if (todo === "") {
    error.innerText = "Please enter a task.";
  } else {
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    const listElement = document.createElement("li");
    listElement.innerText = todo;
    listElement.appendChild(check);
    incompleteBox.appendChild(listElement);
    input.value = "";
    addToLocalStorage(todo);
    // Attach event listener to the newly created checkbox
    check.addEventListener("change", doneTo);
  }
};

// Function to add a task to local storage
const addToLocalStorage = (todo) => {
  let todos = JSON.parse(localStorage.getItem("to-do-list") || "[]");
  if (!Array.isArray(todos)) {
    todos = []; // Ensure todos is an array
  }
  todos.push(todo);
  localStorage.setItem("to-do-list", JSON.stringify(todos));
};

// Load to-do items from local storage on page load
const loadFromLocalStorage = () => {
  let todos = JSON.parse(localStorage.getItem("to-do-list") || "[]");
  let completeTodos = JSON.parse(
    localStorage.getItem("to-do-list-complete") || "[]"
  );
  if (!Array.isArray(todos)) {
    todos = []; // Ensure todos is an array
  }

  // Load incomplete tasks
  todos.forEach((todo) => {
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    const listElement = document.createElement("li");
    listElement.innerText = todo;
    listElement.appendChild(check);
    incompleteBox.appendChild(listElement);
    check.addEventListener("change", doneTo);
  });

  // Load complete tasks
  completeTodos.forEach((completeTodo) => {
    const button = document.createElement("button");
    button.innerText = "Delete";
    const listElement = document.createElement("li");
    listElement.innerText = completeTodo;
    listElement.appendChild(button);
    completeBox.appendChild(listElement);
    button.addEventListener("click", removeTodo);
  });
};

// Event listener for the Add button
btn.addEventListener("click", addList); // Use direct function reference
document.addEventListener("DOMContentLoaded", loadFromLocalStorage);

// Function to handle checkbox click event
const doneTo = (e) => {
  const checkbox = e.target;
  if (checkbox.checked) {
    let todos = JSON.parse(localStorage.getItem("to-do-list") || "[]");
    if (!Array.isArray(todos)) {
      todos = []; // Ensure todos is an array
    }
    let task = checkbox.parentElement.innerText;
    let index = todos.indexOf(task);
    if (index !== -1) {
      todos.splice(index, 1); // Remove the task from the array
      localStorage.setItem("to-do-list", JSON.stringify(todos)); // Update local storage
    }
    completeDo(task);
  }
};

// Function to move a task to the completed list
const completeDo = (completeTask) => {
  const button = document.createElement("button");
  button.innerText = "Delete";
  const listElement = document.createElement("li");
  listElement.innerText = completeTask;
  listElement.appendChild(button);
  completeBox.appendChild(listElement);

  // Save the completed task to local storage
  addToLocalStorageComplete(completeTask);
  button.addEventListener("click", removeTodo);
};

// Function to add a completed task to local storage
const addToLocalStorageComplete = (completeTodos) => {
  let todos = JSON.parse(localStorage.getItem("to-do-list-complete") || "[]");
  if (!Array.isArray(todos)) {
    todos = []; // Ensure todos is an array
  }
  todos.push(completeTodos);
  localStorage.setItem("to-do-list-complete", JSON.stringify(todos));
};

// Function to remove a completed task
const removeTodo = (e) => {
  const buttonClicked = e.target;
  const listItem = buttonClicked.parentElement;
  const task = listItem.childNodes[0].nodeValue.trim(); // Get the text of the list item without the button text
  let completeTodos = JSON.parse(
    localStorage.getItem("to-do-list-complete") || "[]"
  );
  const index = completeTodos.indexOf(task);
  if (index !== -1) {
    completeTodos.splice(index, 1); // Remove the task from the array
    localStorage.setItem("to-do-list-complete", JSON.stringify(completeTodos)); // Update local storage
  }
  listItem.remove(); // Remove the task from the DOM
};
