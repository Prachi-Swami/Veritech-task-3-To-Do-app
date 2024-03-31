document.addEventListener("DOMContentLoaded", function() {
  loadTasks();
  document.getElementById("addTaskBtn").addEventListener("click", addTask);
});

function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskText = taskInput.value.trim();
  if (taskText !== "") {
      var task = { text: taskText, completed: false };
      saveTask(task);
      displayTask(task);
      taskInput.value = "";
  }
}

function displayTask(task) {
  var taskList = document.getElementById("taskList");
  var taskItem = document.createElement("div");
  taskItem.classList.add("task");
  taskItem.innerHTML = `
      <input type="checkbox" onchange="toggleTaskCompletion(this, ${task.id})" ${task.completed ? "checked" : ""}>
      <span>${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
  `;
  taskList.appendChild(taskItem);
}

function saveTask(task) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  task.id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function(task) {
      displayTask(task);
  });
}

function deleteTask(id) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  var filteredTasks = tasks.filter(function(task) {
      return task.id !== id;
  });
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  var taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  filteredTasks.forEach(function(task) {
      displayTask(task);
  });
}

function toggleTaskCompletion(checkbox, id) {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  var taskIndex = tasks.findIndex(function(task) {
      return task.id === id;
  });
  tasks[taskIndex].completed = checkbox.checked;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
