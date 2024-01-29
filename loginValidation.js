document.addEventListener("DOMContentLoaded", function () {
  function validateLoginForm() {
    const username = document.forms["loginForm"]["username"].value;
    const password = document.forms["loginForm"]["password"].value;

    if (username === "" || password === "") {
      alert("All fields must be filled out");
      return false;
    }

    return true;
  }

  const loginForm = document.forms["loginForm"];
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateLoginForm()) {
      alert("Login success, Welcome back...");
    }
  });
});
