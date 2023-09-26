//Mô phỏng database
const accounts = [
  {
    username: "alien",
    email: "alien@gmail.com",
    fullName: "alien dev",
    phoneNumber: "0123123123",
    password: "Minhthanh1@",
    projects: ["project1", "project2", "project3"],
  },
];

const projects = [
  {
    name: "Do homeword",
    id: "project1",
    author: "alien",
    tasks: [
      {
        id: "task1",
        content: "Do homework",
        author: "alien",
        done: false,
      },
      {
        id: "task2",
        content: "Do homework",
        author: "alien",
        done: false,
      },
    ],
    members: [
      {
        name: "alien",
        role: "admin",
      },
      {
        name: "meo",
        role: "member",
      },
    ],
  },
];
