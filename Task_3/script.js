document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const startTimeInput = document.getElementById('start-time-input');
    const endTimeInput = document.getElementById('end-time-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').textContent,
                startTime: taskItem.querySelector('.task-start-time').textContent,
                endTime: taskItem.querySelector('.task-end-time').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToDOM = (task) => {
        const taskItem = document.createElement('li');

        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        taskDetails.appendChild(taskText);

        const taskTimes = document.createElement('span');
        taskTimes.innerHTML = `From: <span class="task-start-time">${task.startTime}</span> - To: <span class="task-end-time">${task.endTime}</span>`;
        taskDetails.appendChild(taskTimes);

        taskItem.appendChild(taskDetails);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(taskItem));
        taskItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(taskItem));
        taskItem.appendChild(deleteButton);

        taskText.addEventListener('click', () => toggleTaskCompletion(taskItem));
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskList.appendChild(taskItem);
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        const startTime = startTimeInput.value;
        const endTime = endTimeInput.value;

        if (taskText !== '' && startTime !== '' && endTime !== '') {
            const task = { text: taskText, startTime: startTime, endTime: endTime, completed: false };
            addTaskToDOM(task);
            saveTasks();
            taskInput.value = '';
            startTimeInput.value = '';
            endTimeInput.value = '';
        }
    };

    const editTask = (taskItem) => {
        const taskText = taskItem.querySelector('.task-text');
        const newText = prompt('Edit task:', taskText.textContent);
        if (newText !== null) {
            taskText.textContent = newText;
        }

        const startTime = taskItem.querySelector('.task-start-time');
        const newStartTime = prompt('Edit start time (HH:MM):', startTime.textContent);
        if (newStartTime !== null) {
            startTime.textContent = newStartTime;
        }

        const endTime = taskItem.querySelector('.task-end-time');
        const newEndTime = prompt('Edit end time (HH:MM):', endTime.textContent);
        if (newEndTime !== null) {
            endTime.textContent = newEndTime;
        }

        saveTasks();
    };

    const deleteTask = (taskItem) => {
        taskList.removeChild(taskItem);
        saveTasks();
    };

    const toggleTaskCompletion = (taskItem) => {
        taskItem.classList.toggle('completed');
        saveTasks();
    };

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
