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

const createTaskButton = document.getElementById("create-task__button");
createTaskButton.addEventListener("click", () => {
  console.log("Create Task");
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

function handleDelete(id) {
  console.log("Delete", id);
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

function renderTasks() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const currentProject = projects.find(
    (project) => project.id === getParameterByName("id")
  );
  const tasks = currentProject.tasks;
  let content = "You don't have any task. Let's create a task";
  if (tasks.length) {
    content = tasks.reduce(
      (result, item) => {
        return (result += `<tr>
    <td>${item.name}</td>
    <td class=${item.done ? "done" : "in-progress"}>${
          item.done ? "Done" : "In Progress"
        }</td>
    <td>${item.author}</td>
    <td><button class="done-button button-small" onclick=handleDone('${
      item.id
    }')>Done</button></td>
    <td><button class="detail-button button-small" onclick=handleShowDetail('${
      item.id
    }')>Edit</button></td>
    <td><button class="delete-button button-small" onclick=handleDelete('${
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
