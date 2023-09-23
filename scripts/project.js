//Khi add project thì sẽ add project đó vào mảng projecs sau đó trong accounts tìm đến account hiện tại add id của project vào field project

const projects = JSON.parse(localStorage.getItem("projects")) || [];

//get Username
function getUsername() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  document.getElementById("welcome-username").innerHTML =
    currentUser?.fullName || "alien";
}
getUsername();

const createProjectButton = document.getElementById("create-project__button");
createProjectButton.addEventListener("click", () => {
  handleCreateProject();
  renderProjects();
});

function handleCreateProject() {
  const createProjectInput = document.getElementById("create-project__input");
  const id = "pid" + new Date().getTime();
  const name = createProjectInput.value.trim();
  if (!name) {
    return;
  }
  addProject(name, id);
  addProjectIdToAccount(id);

  createProjectInput.value = "";
  createProjectInput.focus();
}

function addProject(name, id) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const project = {
    name,
    id,
    author: currentUser.username,
    tasks: [],
    members: [
      {
        name: currentUser.username,
        role: "admin",
      },
    ],
    done: false,
  };
  projects.push(project);
  localStorage.setItem("projects", JSON.stringify(projects));
}

function addProjectIdToAccount(id) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  accounts.forEach((item) => {
    if (item.username === currentUser.username) {
      if (item.project) {
        item.project.push(`${id}`);
      } else {
        item.project = [`${id}`];
      }
    }
  });
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

function handleShowDetail(id) {
  location.href = `detail.html?id=${id}`;
}
function handleDone(id) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  projects.forEach((project) => {
    if (project.id === id) {
      project.done = true;
    }
  });
  localStorage.setItem("projects", JSON.stringify(projects));
  renderProjects();
}

function handleDelete(id) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const foundIndex = projects.findIndex((item) => item.id === id);
  console.log(foundIndex);
  projects.splice(foundIndex, 1);
  localStorage.setItem("projects", JSON.stringify(projects));
  renderProjects();
}

function renderProjects() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  let content = "You don't have any projects. Let's create a project";
  if (projects.length) {
    content = projects.reduce(
      (result, item) => {
        return (result += `<tr>
    <td>${item.name}</td>
    <td class=${item.done ? "done" : "in-progress"}>${
          item.done ? "Done" : "In Progress"
        }</td>
    <td>${item.tasks.length}</td>
    <td>${item.members.length}</td>
    <td>${item.author}</td>
    <td><button class="detail-button button-small" onclick=handleShowDetail('${
      item.id
    }')>Detail</button></td>
    <td><button class="done-button button-small" onclick=handleDone('${
      item.id
    }')>Done</button></td>
    <td><button class="delete-button button-small" onclick=handleDelete('${
      item.id
    }')>Delete</button></td>
  </tr>`);
      },
      `<tr>
    <th>Name</th>
    <th>State</th>
    <th>Task</th>
    <th>Member</th>
    <th>Author</th>
    <th colspan="3">Action</th>
    </tr>
    `
    );
  }
  const table = document.getElementById("table-project");
  table.innerHTML = content;
}

function renderUsers() {
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const content = accounts.reduce((result, item) => {
    return (result += `<li class="user">
      <i class="fas fa-user"></i>
  <span>${item.fullName}</span>
</li>`);
  }, "");
  document.getElementById("users").innerHTML = content;
}

renderProjects(projects);
renderUsers();
