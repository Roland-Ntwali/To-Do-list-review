// selecting elements from the DOM
const form = document.querySelector('form');
const input = document.querySelector('.input');
const todoContainer = document.querySelector('.todoContainer');

// defining empty arrays and variables
let todos = [];
let todo;

// function  saving todos to the local storage
const saveTodo = () => {
  const allTodos = JSON.stringify(todos);
  localStorage.setItem('todos', allTodos);
};

// function getting stored thing from the storage
const getStoredTodos = () => {
  todos = JSON.parse(localStorage.getItem('todos'));
};

// function to store a new todo
const store = () => {
  todo = {
    Description: input.value,
    id: todos.length + 1,
    completed: false,
  };
  todos.push(todo);
  saveTodo();
};

// function to clear the input field after submission
const clear = () => {
  input.value = '';
};

// function to mark a todo as completed or not completed
const completedTodo = (stats, index) => {
  todos[index - 1].completed = stats;
  saveTodo();
};

// function to remove a task
const removeTask = (id) => {
  todos = todos.filter((task) => task.id !== id);
  todos.forEach((todo, id) => {
    todo.id = id + 1;
  });
  saveTodo();
};

// function to create and add a new task to the DOM
const addTask = (todo) => {
  const ul = document.createElement('div');
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.classList.add('checkBox');

  const newInp = document.createElement('input');
  newInp.type = 'text';
  newInp.classList.add('newInput');
  newInp.value = todo.Description;

  checkBox.onclick = (e) => {
    completedTodo(e.target.checked, todo.id);

    if (todo.completed === true) {
      newInp.classList.add('completed');
    } else {
      newInp.classList.remove('completed');
    }
  };

  if (todo.completed === true) {
    checkBox.checked = 'checked';
    newInp.classList.add('completed');
  }

  const icon = document.createElement('i');
  icon.classList.add('fa-solid');
  icon.classList.add('fa-trash');
  icon.classList.add('dots');
  const hr = document.createElement('hr');
  ul.append(checkBox, newInp, icon, hr);
  todoContainer.append(ul);
  icon.addEventListener('click', () => {
    icon.parentElement.remove();
    removeTask(todo.id);
  });
};

// loop through the todos array and add each task to the DOM
todos.forEach(addTask);

// function to edit a todo
const editTodoList = () => {
  const editInput = document.querySelectorAll('.newInput');
  editInput.forEach((edits, indexy) => {
    edits.addEventListener('change', () => {
      todos.forEach((todo, index) => {
        if (indexy === index) {
          todo.Description = edits.value;
          saveTodo();
        }
      });
    });
  });
};
editTodoList();

// listen for form submission and store a new todo
function formSubmission() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value !== '') {
      store();
      addTask(todo);
      clear();
    }
  });
}

// function to populate tasks from the local storage
const populateTasks = () => {
  if (localStorage.getItem('todos')) {
    getStoredTodos();
    todos.map((task) => {
      addTask(task);
      return task;
    });
  } else {
    todos.map((task) => {
      addTask(task);
      return task;
    });
  }
};

const clearCompleted = () => {
  todos = todos.filter((task) => task.completed !== true);
  todos.forEach((todo, id) => {
    todo.id = id + 1;
  });
  saveTodo();
  window.location.reload();
};

export {
  formSubmission, editTodoList, populateTasks, clearCompleted,
};
