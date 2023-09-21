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
  handleCreateProject(projects);
  renderProjects(projects);
  localStorage.setItem("projects", JSON.stringify(projects));
});

function handleCreateProject(projects) {
  const createProjectInput = document.getElementById("create-project__input");
  var id = "pid" + new Date().getTime();
  const name = createProjectInput.value.trim();
  if (!name) {
    return;
  }
  const project = {
    name,
    id,
    author: "Minh Thanh",
    tasks: [],
    members: [
      {
        name: "Minh Thanh",
        role: "admin",
      },
    ],
    done: false,
  };
  projects.push(project);
  createProjectInput.value = "";
  createProjectInput.focus();
  console.log(projects);
}

function handleShowDetail(id) {
  console.log("Detail", id);
}
function handleDelete(id) {
  console.log("Delete", id);
}
function handleDone(id) {
  console.log("Done", id);
}

function renderProjects(projects) {
  let content = "You don't have any projects. Let's create a project";
  if (projects.length) {
    content = projects.reduce(
      (result, item) => {
        return (result += `<tr>
    <td>${item.name}</td>
    <td>${item.tasks.length}</td>
    <td>${item.members.length}</td>
    <td>${item.author}</td>
    <td><button class="detail-button button-small" onclick=handleShowDetail('${item.id}')>Detail</button></td>
    <td><button class="done-button button-small" onclick=handleDone('${item.id}')>Done</button></td>
    <td><button class="delete-button button-small" onclick=handleDelete('${item.id}')>Delete</button></td>
  </tr>`);
      },
      `<tr>
    <th>Name</th>
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
renderProjects(projects);
