const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const username = document.getElementById("username");
const phoneNumber = document.getElementById("phone-number");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const FULLNAME_REGEX = /^[a-zA-Z]{2,}( [a-zA-Z]+){1,2}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const USERNAME_REGEX = /^(\w{2,10})$/;
const PHONENUMBER_REGEX = /^0\d{9}$/;
const PASSWORDS_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const registerButton = document.getElementById("register-button");

registerButton.addEventListener("click", (event) => {
  event.preventDefault();
  clearErrorMessage("form-register", "error-message");
  let accounts = JSON.parse(localStorage.getItem("accounts"));
  const form = validateForm(accounts);
  if (form.isValid) {
    if (accounts) {
      accounts.push(form.data);
    } else {
      accounts = [form.data];
    }
    localStorage.setItem("accounts", JSON.stringify(accounts));
    console.log("Successfully registered");
    window.location.href = "/aliendoit/login/index.html";
    clearInput("form-register", "input");
  }
});

function validateForm(database) {
  const isValidFullName = validateInput({
    element: fullName,
    regExp: FULLNAME_REGEX,
    errorMessage: "Please enter more than 2 words",
  });
  const isValidEmail = validateInput({
    element: email,
    regExp: EMAIL_REGEX,
    errorMessage: "Please enter correct email syntax",
    callback: () => validateAlreadyExists(email, "email", database),
  });
  const isValidUsername = validateInput({
    element: username,
    regExp: USERNAME_REGEX,
    errorMessage: "Enter more than 2 letters and less than 10 letters",
    callback: () => validateAlreadyExists(username, "username", database),
  });
  const isValidPhoneNumber = validateInput({
    element: phoneNumber,
    regExp: PHONENUMBER_REGEX,
    errorMessage: "Please enter 10 digits and start with a digit 0",
    callback: () => validateAlreadyExists(phoneNumber, "phoneNumber", database),
  });
  const isValidPassword = validateInput({
    element: password,
    regExp: PASSWORDS_REGEX,
    errorMessage: "Password is not strong enough",
  });
  const isValidConfirmPassword = validateInput({
    element: confirmPassword,
    callback: () => {
      const value = confirmPassword.value.trim();
      if (value !== password.value.trim()) {
        setErrorMessage(confirmPassword, "Not the same as a password");
        return false;
      }
      return true;
    },
  });
  console.log(
    isValidFullName,
    isValidEmail,
    isValidUsername,
    isValidPhoneNumber,
    isValidPassword,
    isValidConfirmPassword
  );
  return {
    isValid:
      isValidFullName &&
      isValidEmail &&
      isValidUsername &&
      isValidPhoneNumber &&
      isValidPassword &&
      isValidConfirmPassword,
    data: {
      fullName: fullName.value.trim(),
      email: email.value.trim(),
      username: username.value.trim(),
      phoneNumber: phoneNumber.value.trim(),
      password: password.value.trim(),
    },
  };
}

function validateInput({
  element,
  regExp = /./,
  errorMessage = "",
  callback = () => true,
  required = true,
}) {
  let isValidCallback = callback();
  let isValidRegExp = validateRegExp(element, regExp, errorMessage);
  let isValidRequired = required ? validateEmpty(element) : true;
  return isValidCallback && isValidRegExp && isValidRequired;
}

function validateEmpty(element) {
  const value = element.value.trim();

  if (!value) {
    setErrorMessage(element, "Required");
    return false;
  }
  return true;
}

function validateRegExp(element, regExp, errorMessage) {
  const value = element.value.trim();
  let isValid = regExp.test(value);
  if (!isValid) {
    setErrorMessage(element, errorMessage);
    return false;
  }
  return true;
}

const clearErrorMessage = (form, className) => {
  document.forms[form]
    .querySelectorAll(`.${className}`)
    .forEach((element) => (element.innerHTML = ""));
};
function clearInput(form, className) {
  document.forms[form]
    .querySelectorAll(`.${className}`)
    .forEach((element) => (element.value = ""));
}

function setErrorMessage(element, message) {
  const errorSpan = element.nextElementSibling;
  errorSpan.innerHTML = message;
}

function setLocalStorage(key, value) {
  const data = localStorage.getItem(key);
  console.log(data);
}
function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  console.log(data);
}
function setArrayDataToLocalStorage(data) {}
function validateAlreadyExists(field, key, data) {
  let isValid = true;
  if (!data) {
    data = [];
  }
  data.forEach((item) => {
    if (item[key] === field.value.trim()) {
      setErrorMessage(field, "Already exists");
      isValid = false;
    }
  });
  return isValid;
}
