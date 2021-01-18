//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//EVENT LISTENERS
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);
//FUNCTIONS

function addTodo(e) {
  //PREVENT FORM FROM SUBMITTING
  e.preventDefault();
  //create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; //SETS CONTENTS OF TODO LI AS THE VALUE OF THE INPUT BOX -PLACEHOLDER WAS "hey"
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //ADD NEW TODO TO LOCAL STORAGE
  saveLocaltodos(todoInput.value); //RUNS SAVE LOCALTODOS FUNCTION (SEE END OF CODE) AND PUTS THE VALUE OF TODO INPUT AS THE PARAMETER
  //Check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //append to list
  todoList.appendChild(todoDiv);
  //CLEAR INPUT BOX WHEN SUBMITTED
  todoInput.value = "";
}
//delete button actions
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement; //creates a variable called todo containing all of the contents of item
    todo.classList.add("fall"); //change todo class to 'fall'
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      //adds an event listener with a function to activate once css transition is complete
      todo.remove(); //removes todo
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
//check button actions
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocaltodos(todo) {
  //FUNCTION TO PASS TODOS INTO LOCAL STORAGE
  let todos; //CREATE EMPTY VARIABLE, TODOS
  //CHECK - DO I ALREADY HAVE TODOS SAVED LOCALLY?
  if (localStorage.getItem("todos") === null) {
    todos = []; //IF NOT, CHANGE TODOS VARIABLE INTO AN EMPTY ARRAY
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  console.log(`hello`);
  let todos;
  //CHECK - DO I ALREADY HAVE TODOS SAVED LOCALLY?
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; //SETS CONTENTS OF TODO LI AS THE VALUE OF THE INPUT BOX -PLACEHOLDER WAS "hey"
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
  });

  //REMOVING ELEMENTS FROM ARRAY - JUST MESSING ABOUT

  const people = ["fred", "john", "roger", "dave", "mike"]; //CREATE AN ARRAY OF PEOPLE
  console.log(people);

  const rogerIndex = people.indexOf("roger"); //CREATE A VARIABLE, STORE THE INDEX VALUE OF ROGER

  console.log(rogerIndex);

  people.splice(rogerIndex, 1); // CUTS OUT ROGER FROM THE ARRAY. SELECTS ROGERINDEX, THEN GIVES 1 AS THE SECOND VALUE, AS YOU ONLY WANT TO SPLICE HIM, NOT OTHERS TOO
  console.log(people);
  //SO, YOU LOOK AT YOUR ARRAY, FIND THE INDEX OF WHO YOU WANT GONE, STORE IT IN A VARIABLE, THEN SPLICE THE ARRAY, CALLING THE INDEX VALUE YOU JUST FOUND, AND THE NUMBER 1 TO TELL
  //THE SPLICE FUNCTION THAT YOU ONLY WANT TO DELETE ONE PERSON.
}
