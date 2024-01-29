document.addEventListener("DOMContentLoaded", function () {
  function validateSignupForm() {
    const username = document.forms["signupForm"]["username"].value;
    const password = document.forms["signupForm"]["password"].value;
    const repeatPassword =
      document.forms["signupForm"]["repeat-password"].value;
    const email = document.forms["signupForm"]["email"].value;

    if (
      username === "" ||
      password === "" ||
      repeatPassword === "" ||
      email === ""
    ) {
      alert("All fields must be filled out");
      return false;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address");
      return false;
    }

    if (password !== repeatPassword) {
      alert("Passwords do not match");
      return false;
    }

    return true;
  }

  const signupForm = document.forms["signupForm"];
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateSignupForm()) {
      alert("Form is valid. Submitting...");
    }
  });
});
