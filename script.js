const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const userSelect = document.getElementById('userSelect');
const todoList = document.getElementById('todoList');
let allTodos = [];

async function fetchTodos() {
  try {
    const response = await fetch(API_URL);
    const todos = await response.json();
    allTodos = todos;

    populateDropdown(todos);
    displayTodos(todos);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function populateDropdown(todos) {
  const userIds = [...new Set(todos.map(todo => todo.userId))];
  
  userIds.forEach(id => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = `User ID: ${id}`;
    userSelect.appendChild(option);
  });
}

function displayTodos(todos) {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = `${todo.userId}: ${todo.title}`;
    todoList.appendChild(li);
  });
}

userSelect.addEventListener('change', () => {
  const selectedUser = userSelect.value;
  if (selectedUser === 'all') {
    displayTodos(allTodos);
  } else {
    const filtered = allTodos.filter(todo => todo.userId == selectedUser);
    displayTodos(filtered);
  }
});

fetchTodos();