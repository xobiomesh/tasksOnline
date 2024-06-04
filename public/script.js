// Function to save tasks to the server
async function saveTasksToServer(username, tasks) {
    await fetch('http://localhost:3000/saveTasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, tasks })
    });
}

// Function to load tasks from the server
async function loadTasksFromServer(username) {
    const response = await fetch('http://localhost:3000/loadTasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    });
    const data = await response.json();
    return data.tasks;
}

// Function to save tasks locally
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list ul li').forEach(task => {
        tasks.push(task.textContent);
    });
    return tasks;
}

// Function to load tasks locally
function loadTasks(tasks) {
    const taskList = document.getElementById('task-list').querySelector('ul');
    taskList.innerHTML = '';
    tasks.forEach(taskText => {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.addEventListener('click', function() {
            taskItem.classList.toggle('selected');
        });
        taskList.appendChild(taskItem);
    });
}

// Event listener for adding a task
document.getElementById('add-task-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskList = document.getElementById('task-list').querySelector('ul');
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.addEventListener('click', function() {
            taskItem.classList.toggle('selected');
        });
        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
});

// Event listener for clearing tasks
document.getElementById('clear-tasks-btn').addEventListener('click', function() {
    const taskList = document.getElementById('task-list').querySelector('ul');
    taskList.innerHTML = '';
});

// Event listener for deleting selected tasks
document.getElementById('delete-task-btn').addEventListener('click', function() {
    const taskList = document.getElementById('task-list').querySelector('ul');
    const selectedTasks = taskList.querySelectorAll('li.selected');
    selectedTasks.forEach(task => task.remove());
});

// Event listener for saving tasks to server
document.getElementById('save-tasks-btn').addEventListener('click', async function() {
    const username = document.getElementById('username').value.trim();
    if (username) {
        const tasks = saveTasks();
        await saveTasksToServer(username, tasks);
        alert('Tasks saved successfully.');
    } else {
        alert('Please enter a username.');
    }
});

// Event listener for loading tasks from server
document.getElementById('load-tasks-btn').addEventListener('click', async function() {
    const username = document.getElementById('username').value.trim();
    if (username) {
        const tasks = await loadTasksFromServer(username);
        loadTasks(tasks);
    } else {
        alert('Please enter a username.');
    }
});
