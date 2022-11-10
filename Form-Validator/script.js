"use strict";

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password confirmation");

//functions
const checkRequired = (inputArray) => {
  inputArray.forEach((input) => {
    if (input.value === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const getFieldName = (input) => {
  return `${input.id.charAt(0).toUpperCase()}${input.id.slice(1)}`;
};

const showError = (input, message) => {
  const formControl = input.parentElement;
  const smallTag = formControl.querySelector("small");

  formControl.className = "form-control error";
  smallTag.innerHTML = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must have at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must have less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

const checkEmail = (input) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `Email is not valid`);
  }
};

const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords must match");
  }
};

//event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, passwordConfirmation]);
  checkLength(username, 3, 16);
  checkLength(password, 3, 10);
  checkEmail(email);
  checkPasswordsMatch(password, passwordConfirmation);
});
