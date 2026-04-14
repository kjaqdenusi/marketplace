const apiURL = 'http://localhost:3000/todos';
const todoList = document.getElementById('todo-list');
const newTodoForm = document.getElementById('new-todo-form');
const newTodoInput = document.getElementById('new-todo-input');

// Fetch and display all todos
async function fetchTodos() {
  const response = await fetch(apiURL);
  const todos = await response.json();
  todoList.innerHTML = '';
  todos.forEach(todo => addTodoToDOM(todo));
}

// Add a single todo item to the DOM
function addTodoToDOM(todo) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.id = `todo-${todo.id}`;

  li.innerHTML = `
    <!-- View mode -->
    <div class="view-mode d-flex align-items-center gap-2 w-100">
      <span class="${todo.completed ? 'completed' : ''}">${todo.task}</span>
      <div class="ms-auto d-flex gap-2">
        <button class="btn btn-sm btn-outline-secondary" onclick="showEditMode(${todo.id}, '${todo.task.replace(/'/g, "\\'")}')">
          <i class="bi bi-pencil"></i> Edit
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteTodo(${todo.id})">
          <i class="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>

    <!-- Edit mode (hidden by default) -->
    <div class="edit-mode d-none d-flex align-items-center gap-2 w-100">
      <input type="text" class="form-control form-control-sm edit-input" value="${todo.task}">
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-success" onclick="saveEdit(${todo.id})">
          <i class="bi bi-check-lg"></i> Save
        </button>
        <button class="btn btn-sm btn-secondary" onclick="cancelEdit(${todo.id})">
          Cancel
        </button>
      </div>
    </div>
  `;

  todoList.appendChild(li);
}

// Switch a todo row into edit mode
function showEditMode(id) {
  const li = document.getElementById(`todo-${id}`);
  li.querySelector('.view-mode').classList.add('d-none');
  li.querySelector('.edit-mode').classList.remove('d-none');
  li.querySelector('.edit-input').focus();
}

// Cancel edit — go back to view mode
function cancelEdit(id) {
  const li = document.getElementById(`todo-${id}`);
  li.querySelector('.edit-mode').classList.add('d-none');
  li.querySelector('.view-mode').classList.remove('d-none');
}

// Save edit — PATCH request to update just the task name
async function saveEdit(id) {
  const li = document.getElementById(`todo-${id}`);
  const newTask = li.querySelector('.edit-input').value.trim();

  if (!newTask) return;

  await fetch(`${apiURL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: newTask }),
  });

  fetchTodos(); // Refresh the list
}

// Add new todo — POST request
newTodoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newTask = newTodoInput.value.trim();
  if (!newTask) return;

  await fetch(apiURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: newTask, completed: false }),
  });

  newTodoInput.value = '';
  fetchTodos();
});

// Delete a todo — DELETE request
async function deleteTodo(id) {
  await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
  fetchTodos();
}

// Load todos on page load
fetchTodos();
