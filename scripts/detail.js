const projects = JSON.parse(localStorage.getItem("projects")) || [];
const currentProject = projects.find(
  (project) => project.id === getParameterByName("id")
);
//get Username
function renderUsername() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  document.getElementById("welcome-username").innerHTML =
    currentUser?.fullName || "alien";
}

function renderProjectName(project) {
  document.getElementById("project-name").innerHTML = project.name;
}

renderUsername();
renderProjectName(currentProject);
renderTasks();
renderMembers();

const createTaskInput = document.getElementById("create-task__input");
createTaskInput.addEventListener("keydown", (event) => {
  console.log(event.keyCode);
  if (event.keyCode === 13) {
    handleCreateTask();
    renderTasks();
  }
});

const createTaskButton = document.getElementById("create-task__button");
createTaskButton.addEventListener("click", () => {
  window.addEventListener("keydown", (event) => {
    console.log(event.keyCode);
  });
  handleCreateTask();
  renderTasks();
});

function handleCreateTask() {
  const createTaskInput = document.getElementById("create-task__input");
  const id = "tid" + new Date().getTime();
  const name = createTaskInput.value.trim();
  if (!name) {
    return;
  }
  addTaskToProject(name, id);

  createTaskInput.value = "";
  createTaskInput.focus();
}

function addTaskToProject(name, id) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const currentProject = projects.find(
    (project) => project.id === getParameterByName("id")
  );
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const task = {
    id,
    name,
    author: currentUser.username,
  };
  currentProject.tasks.push(task);

  const foundIndex = projects.findIndex(
    (project) => project.id === currentProject.id
  );
  projects.splice(foundIndex, 1, currentProject);

  localStorage.setItem("projects", JSON.stringify(projects));
}

function handleEdit(id) {
  renderTasks();
  const element = document.getElementById(`task-${id}`);
  const task = element.getElementsByClassName("task-name");
  const content = task[0].innerHTML;

  task[0].innerHTML = `<input type="text" id='input-edit-task' />`;
  task[0].children[0].value = content;
  task[0].children[0].focus();
  

  const editTask = element.getElementsByClassName("task-edit");
  editTask[0].innerHTML = `<button class="save-button button-small">Save</button>`;

  editTask[0].children[0].onclick = () => {
    handleSaveEdit(id, task[0].children[0].value);
  };

}

function handleDelete(id) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const currentProject = projects.find(
    (project) => project.id === getParameterByName("id")
  );

  const foundIndexProject = projects.findIndex(
    (project) => project.id === currentProject.id
  );
  const foundIndexTask = projects[foundIndexProject].tasks.findIndex(
    (task) => task.id === id
  );
  projects[foundIndexProject].tasks.splice(foundIndexTask, 1);

  localStorage.setItem("projects", JSON.stringify(projects));
  renderTasks();
}
function handleDone(id) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const currentProject = projects.find(
    (project) => project.id === getParameterByName("id")
  );

  const foundIndexProject = projects.findIndex(
    (project) => project.id === currentProject.id
  );
  const foundIndexTask = projects[foundIndexProject].tasks.findIndex(
    (task) => task.id === id
  );
  projects[foundIndexProject].tasks[foundIndexTask].done = true;

  localStorage.setItem("projects", JSON.stringify(projects));
  renderTasks();
}

function handleSaveEdit(id, name) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const currentProject = projects.find(
    (project) => project.id === getParameterByName("id")
  );

  const foundIndexProject = projects.findIndex(
    (project) => project.id === currentProject.id
  );
  const foundIndexTask = projects[foundIndexProject].tasks.findIndex(
    (task) => task.id === id
  );
  projects[foundIndexProject].tasks[foundIndexTask].name = name;

  localStorage.setItem("projects", JSON.stringify(projects));
  renderTasks();
}

function renderTasks() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const currentProject = projects.find(
    (project) => project.id === getParameterByName("id")
  );
  //
  const tasks = currentProject.tasks;
  let content = "You don't have any task. Let's create a task";
  if (tasks.length) {
    content = tasks.reduce(
      (result, item) => {
        return (result += `<tr id='task-${item.id}'>
    <td class='task-name'>${item.name}</td>
    <td class=${item.done ? "done" : "in-progress"}>${
          item.done ? "Done" : "In Progress"
        }</td>
    <td>${item.author}</td>
    <td class='task-done'><button class="done-button button-small" onclick=handleDone('${
      item.id
    }')>Done</button></td>
    <td class='task-edit'><button class="edit-button button-small" 
    onclick=handleEdit('${item.id}')>Edit</button></td>
    <td class='task-delete'><button class="delete-button button-small" ondblclick=handleDelete('${
      item.id
    }')>Delete</button></td>
  </tr>`);
      },
      `<tr>
    <th>Name</th>
    <th>State</th>
    <th>Author</th>
    <th colspan="3">Action</th>
    </tr>
    `
    );
  }
  const table = document.getElementById("table-task");
  table.innerHTML = content;
}

function renderMembers() {
  const currentProject = projects.find(
    (project) => project.id === getParameterByName("id")
  );
  const members = currentProject.members;
  const content = members.reduce((result, item) => {
    return (result += `<li class="user">
      <i class="fas fa-user"></i>
  <span>${item.name}</span>
</li>`);
  }, "");
  document.getElementById("members").innerHTML = content;
}

function getParameterByName(name) {
  const url = window.location.href;
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
