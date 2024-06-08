document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("new-task");
    const addTaskBtn = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    };

    const saveTasks = () => {
        const tasks = [];
        taskList.childNodes.forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector(".task").textContent,
                completed: taskItem.querySelector(".task").classList.contains("completed"),
                id: taskItem.getAttribute("data-id")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const addTaskToDOM = task => {
        const taskItem = document.createElement("li");
        taskItem.setAttribute("data-id", task.id);
        
        const taskText = document.createElement("span");
        taskText.className = "task";
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.classList.add("completed");
        }

        const actions = document.createElement("div");
        actions.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.className = "edit";
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit task:", taskText.textContent);
            if (newText) {
                taskText.textContent = newText;
                saveTasks();
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            taskItem.remove();
            saveTasks();
        });

        const statusBtn = document.createElement("button");
        statusBtn.className = "status";
        statusBtn.textContent = task.completed ? "Mark as Pending" : "Mark as Completed";
        statusBtn.addEventListener("click", () => {
            taskText.classList.toggle("completed");
            statusBtn.textContent = taskText.classList.contains("completed") ? "Mark as Pending" : "Mark as Completed";
            saveTasks();
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        actions.appendChild(statusBtn);

        taskItem.appendChild(taskText);
        taskItem.appendChild(actions);

        taskList.appendChild(taskItem);
    };

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = {
                text: taskText,
                completed: false,
                id: Date.now().toString()
            };
            addTaskToDOM(task);
            saveTasks();
            taskInput.value = "";
        }
    });

    loadTasks();
});

