document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.forms["signupForm"];
  const username = document.forms["signupForm"]["username"];
  const password = document.forms["signupForm"]["password"];
  const repeatPassword = document.forms["signupForm"]["repeat-password"];
  const email = document.forms["signupForm"]["email"];
  const usernameMessage = document.querySelector(".username-message");
  const passwordMessage = document.querySelector(".password-message");
  const repeatPasswordMessage = document.querySelector(
    ".repeat-password-message",
  );
  const emailMessage = document.querySelector(".email-message");
  const submitMessage = document.querySelector(".submit-message");
  let isEmailOk = false;
  let isUserNameOk = false;
  let isPasswordOk = false;
  let isRepeatPasswordOk = false;

  const validateUsername = () => {
    if (username.value !== "") {
      usernameMessage.innerHTML = "";
      isUserNameOk = true;
      return true;
    } else if (username.value === "") {
      usernameMessage.innerHTML = "Username is required";
      isUserNameOk = false;
      return false;
    }
  };

  const validatePassword = () => {
    validateRepeatePassword();
    if (password.value.length >= 8) {
      passwordMessage.innerHTML = "";
      isPasswordOk = true;
      return true;
    } else if (password.value.length === 0) {
      passwordMessage.innerHTML = "Password is required";
      isPasswordOk = false;
      return false;
    } else if (password.value.length < 8) {
      passwordMessage.innerHTML = "Password must be at least 8 characters long";
      isPasswordOk = false;
      return false;
    }
  };

  const validateRepeatePassword = () => {
    if (password.value === repeatPassword.value) {
      repeatPasswordMessage.innerHTML = "";
      isRepeatPasswordOk = true;
      return true;
    } else {
      repeatPasswordMessage.innerHTML = "Passwords do not match";
      isRepeatPasswordOk = false;
      return false;
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.value)) {
      emailMessage.innerHTML = "";
      isEmailOk = true;
      return true;
    } else if (!emailRegex.test(email.value)) {
      emailMessage.innerHTML = "Invalid email address";
      isEmailOk = false;
      return false;
    }
  };

  const isEveryFieldValid = () => {
    if (isEmailOk && isPasswordOk && isRepeatPasswordOk && isUserNameOk) {
      submitMessage.innerHTML = "";
    }
  };

  function validateSignupForm() {
    if (
      username.value === "" ||
      password.value === "" ||
      repeatPassword.value === "" ||
      email.value === ""
    ) {
      submitMessage.innerHTML = "All fields must be filled out";
      if (username.value == "") {
        usernameMessage.innerHTML = "Username is required";
      }
      if (username.value !== "") {
        usernameMessage.innerHTML = "";
      }
      if (password.value == "") {
        passwordMessage.innerHTML = "Password is required";
      }
      if (repeatPassword.value == "") {
        repeatPasswordMessage.innerHTML = "Repeat Password is required";
      }
      if (email.value == "") {
        emailMessage.innerHTML = "Email is required";
      }

      return false;
    }

    isEmailOk = validateEmail();
    isPasswordOk = validatePassword();
    isRepeatPasswordOk = validateRepeatePassword();

    if (isEmailOk && isPasswordOk && isRepeatPasswordOk) {
      return true;
    }

    return false;
  }

  username.addEventListener("input", () => {
    validateUsername();
    isEveryFieldValid();
  });

  password.addEventListener("input", () => {
    validatePassword();
    isEveryFieldValid();
  });

  repeatPassword.addEventListener("input", () => {
    validateRepeatePassword();
    isEveryFieldValid();
  });

  email.addEventListener("input", () => {
    validateEmail();
    isEveryFieldValid();
  });

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateSignupForm()) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = existingUsers.some(
        (user) => user.username === username.value,
      );
      if (userExists) {
        submitMessage.innerHTML = "User already exists, please login";
        submitMessage.style.color = "red";
        return;
      }

      const newUser = {
        username: username.value,
        password: password.value,
      };

      existingUsers.push(newUser);

      localStorage.setItem("users", JSON.stringify(existingUsers));

      submitMessage.innerHTML = "Signup success";
      submitMessage.style.color = "#2ddb00";
    }
  });
});
