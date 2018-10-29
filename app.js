// UI Elements
const todoForm = document.getElementById('form-todo');
const allTodos = document.getElementById('collections');
const addTodo = document.getElementById('add-todo');
const clearBtn = document.getElementById('clear-todos');

// Add Todo 
todoForm.addEventListener('submit', addTodoOnList);
// Remove Task
allTodos.addEventListener('click', removeTask);
// Get Todos
document.addEventListener('DOMContentLoaded', getTodos);

// Add ToDo on List
function addTodoOnList(e) {

    if(addTodo.value != '') {
        
        // Create Li
        const li = document.createElement('li');
        li.classList = 'collection-item';
        li.textContent = addTodo.value;

        // Create span
        const removeTodo = document.createElement('span');
        removeTodo.classList = 'remove-todo';
        li.appendChild(removeTodo);

        allTodos.appendChild(li);
        // Store in LocalStore
        storeTodoInLocalStore(addTodo.value);

    }
    
    addTodo.value = '';
    e.preventDefault();
}

// Store Task in LocalStore
function storeTodoInLocalStore(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {

    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        // Create Li
        const li = document.createElement('li');
        li.classList = 'collection-item';
        li.textContent = todo;

        // Create span
        const removeTodo = document.createElement('span');
        removeTodo.classList = 'remove-todo';
        li.appendChild(removeTodo);

        allTodos.appendChild(li);
    });

}

// Complete Todo Function
function removeTask(e) {
    if(e.target.classList.contains('remove-todo')) {
        e.target.parentElement.remove();
    }

    // Remove Todo From LS
    removeTodoFromLS(e.target.parentElement);

}
function removeTodoFromLS(todoItem) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo, i) {
        if(todoItem.textContent === todo) {
            todos.splice(i, 1);
        }
    });

    localStorage.setItem('todos', JSON.stringify(todos));

}

// Clear Todo
clearBtn.addEventListener('click', function() {
    allTodos.innerHTML = '';
    // Clear All Todod From LS
    clearTodosFromLS();
});
function clearTodosFromLS() {
    localStorage.clear();
}