"use strict";

const labelPassword = document.querySelector("#password");
const btnGenerate = document.querySelector(".btn--generate");
const checkboxUpper = document.querySelector("#uppercase");
const checkboxLower = document.querySelector("#lowercase");
const checkboxNum = document.querySelector("#number");
const checkboxSpecial = document.querySelector("#special-chars");

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const nums = "0123456789";
const specialChars = `!"#$%&'()*+,-./\\:;<=>?@[]^_}{|~`;
const specialCharsSafe = `!"'()*+,-.:;=?@[]_}{|`;

const generatePassword = () => {
  // An array of the different character formats to get user choice
  const charsArr = [
    checkboxUpper.checked && upper,
    checkboxLower.checked && lower,
    checkboxNum.checked && nums,
    checkboxSpecial.checked && specialChars,
  ];

  // Filter the charsArray based on the checkbox results of user choice
  const userChoice = charsArr.filter((e) => e);

  // Create and join an array for each character of the password based on the user choice
  const password = Array.from({ length: 16 })
    .map((_, i) => {
      const position = Math.ceil(Math.random() * userChoice.length) - 1;
      const strType = userChoice.at(position);
      const char = strType[Math.ceil(Math.random() * strType.length) - 1];
      return char;
    })
    .join("");

  // Display the password in the UI
  labelPassword.value = password;
};
generatePassword();

btnGenerate.addEventListener("click", generatePassword);

