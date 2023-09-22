(function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    if (window.location.pathname !== "/pages/logIn.html") {
      window.location.href = "/pages/logIn.html";
    }
  }
})();
