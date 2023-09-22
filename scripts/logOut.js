const logOutButton = document.getElementById("logout-button");
logOutButton.addEventListener("click", function (e) {
  localStorage.removeItem("currentUser");
  location.href = "/pages/logIn.html";
});
