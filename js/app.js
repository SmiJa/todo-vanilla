const taskText = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const tasks = [];
const tasksLeftUI = document.getElementById("taskCount");

function newID() {
  return self.crypto.randomUUID();
}

function clearText() {
  taskText.value = "";
}

function updateTasksCount() {
  let tasksLeft = tasks.filter(task => task.completed === false).length;
  tasksLeftUI.innerText = tasksLeft;
}

function buildTaskList(tasksArr) {
  taskList.innerHTML = "";
  for (let i = 0; i < tasksArr.length; i++) {
    const taskDiv = document.createElement("div");
    const taskCheckSpan = document.createElement("span");
    const taskCheckBox = document.createElement("input");
    const taskSpan = document.createElement("span");
    const taskSpanDelete = document.createElement("span");
    const taskDeleteIcon = document.createElement("i");

    // Setting up the task wrapper
    taskDiv.classList = "task";
    taskDiv.id = tasksArr[i].id;

    // Setting up the task checkbox
    taskCheckBox.type = "checkbox";
    taskCheckBox.onclick = (e) => completeTask(e.target);
    taskCheckBox.checked = tasksArr[i].completed ? "checked" : "";
    taskCheckSpan.appendChild(taskCheckBox);
    taskDiv.appendChild(taskCheckSpan);

    // Setting up the task text
    taskSpan.classList = "task-item";
    taskSpan.textContent = tasksArr[i].task;
    taskDiv.appendChild(taskSpan);

    // Setting up the remove task icon
    taskDeleteIcon.classList = "fa-solid fa-trash";
    taskDeleteIcon.onclick = (e) => removeTask(e.target);
    taskSpanDelete.appendChild(taskDeleteIcon);
    taskDiv.appendChild(taskSpanDelete);

    // Add div to the taskList
    taskList.appendChild(taskDiv);
  }
}

function taskID(task) {
  return task.parentElement.parentElement.id;
}

function taskArrPosition(taskId) {
  return tasks.findIndex(item => {
    return item.id == taskId;
  });
}

function removeTask(task) {
  let taskId = taskID(task);
  let taskArrPos = taskArrPosition(taskId);

  tasks.splice(taskArrPos, 1);
  updateLocalStorage();
  updateTasksCount();
  buildTaskList(tasks);
}

function showCompleted() {
  let completedTasks = tasks.filter(task => task.completed === true);
  buildTaskList(completedTasks);
}

function showActive() {
  let completedTasks = tasks.filter(task => task.completed === false);
  buildTaskList(completedTasks);
}

function showAll() {
  buildTaskList(tasks);
}

function clearCompleted() {
  for (let i = 0; i < tasks.length; i++ ) {
    if (tasks[i].completed === true) {
      tasks.splice(i, 1);
    }
  }
  updateLocalStorage();
  buildTaskList(tasks);
}

function updateLocalStorage() {
  localStorage.setItem("tasksList", JSON.stringify(tasks));
}

function completeTask(task) {
  let taskId = taskID(task);
  let taskArrPos = taskArrPosition(taskId);
  let isChecked = task.checked;

  if (isChecked) {
    tasks[taskArrPos].completed = true;
    updateLocalStorage();
    updateTasksCount();
  } else {
    tasks[taskArrPos].completed = false;
    updateLocalStorage();
    updateTasksCount();
  }
}

function addTask() {
  const taskId = newID();
  const taskValue = taskText.value;

  let task = {
    id: taskId,
    task: taskValue,
    completed: false,
  }

  tasks.push(task);
  updateLocalStorage();
  clearText();
  updateTasksCount();
  buildTaskList(tasks);
}

taskText.addEventListener("keypress", (e) => {
  e.preventDefault;

  if (e.key === "Enter") {
    addTask();
  }
});


if ("tasksList" in localStorage) {
  let storedData = JSON.parse(localStorage.getItem("tasksList"));
  for (let i = 0; i < storedData.length; i++) {
    tasks.push(storedData[i])
  }
  updateTasksCount();
  buildTaskList(tasks);
}