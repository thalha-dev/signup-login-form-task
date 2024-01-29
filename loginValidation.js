document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.forms["loginForm"];
  const username = document.forms["loginForm"]["username"];
  const password = document.forms["loginForm"]["password"];
  const usernameMessage = document.querySelector(".username-message");
  const passwordMessage = document.querySelector(".password-message");
  const submitMessage = document.querySelector(".submit-message");
  let isUserNameOk = false;
  let isPasswordOk = false;

  const validateUsername = () => {
    if (username.value !== "") {
      usernameMessage.innerHTML = "";
      isUserNameOk = true;
      return true;
    } else {
      usernameMessage.innerHTML = "Username is required";
      isUserNameOk = false;
      return false;
    }
  };

  const validatePassword = () => {
    if (password.value.length >= 8) {
      passwordMessage.innerHTML = "";
      isPasswordOk = true;
      return true;
    } else if (password.value.length === 0) {
      passwordMessage.innerHTML = "Password is required";
      isPasswordOk = false;
      return false;
    } else {
      passwordMessage.innerHTML = "Password must be at least 8 characters long";
      isPasswordOk = false;
      return false;
    }
  };

  const isEveryFieldValid = () => {
    if (isPasswordOk && isUserNameOk) {
      submitMessage.innerHTML = "";
    }
  };

  function validateLoginForm() {
    if (username.value === "" || password.value === "") {
      submitMessage.innerHTML = "All fields must be filled out";
      return false;
    }

    validateUsername();
    validatePassword();

    return true;
  }

  username.addEventListener("input", () => {
    validateUsername();
    isEveryFieldValid();
  });

  password.addEventListener("input", () => {
    validatePassword();
    isEveryFieldValid();
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateLoginForm()) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      const matchingUser = existingUsers.find(
        (user) =>
          user.username === username.value && user.password === password.value,
      );

      if (matchingUser) {
        submitMessage.style.color = "#2ddb00";
        submitMessage.innerHTML = "Login success, Welcome back...";
      } else {
        submitMessage.innerHTML = "Invalid username or password";
      }
    }
  });
});
