
// Select the elements from the DOM
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");
// An object to store the functions for generating random characters
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};
// Add a click event listener to the "Copy to Clipboard" button
clipboardEl.addEventListener('click', () => {
    // Create a textarea element
    const textarea = document.createElement('textarea')
    // Get the password text from the result element
    const password =resultEl.innerText 
     // If there is no password, return
    if(!password) { return }
        // Set the value of the textarea to the password
        textarea.value = password
        // Add the textarea to the DOM
        document.body.appendChild(textarea)
        // Select the textarea
        textarea.select()
        // Copy the text in the textarea
        document.execCommand('copy')
        // Remove the textarea from the DOM
        textarea.remove()
        // Alert the user that the password was copied to the clipboard
        alert('Password copied to clipboard!')
        

})
// Add a click event listener to the "Generate Password" button
generateEl.addEventListener("click", () => {
    // Get the length of the password from the length element
  const length = +lengthEl.value;
  // Get the checked state of the  checkboxes
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  // Set the text of the result element to the generated password
  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

// A function for generating a password with the specified character types and length
function generatePassword(lower, upper, number, symbol, length) {
    // Initialize an empty string to store the password
  let generatedPassword = "";
   // Count the number of character types that are selected
  const typesCount = lower + upper + number + symbol;
  // Create an array of objects containing the selected character types
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      // Call the appropriate function to generate a random character of the specified type
      generatedPassword += randomFunc[funcName]();
    });
  }
  // Trim the generated password to the specified length
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

// Functions for generating a random character of each specified type
function getRandomLower() {
    // Generate a random lowercase letter by using the ASCII character code for "a" (97)
    // as the starting point and selecting a random number between 0 and 25
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    // Generate a random uppercase letter by using the ASCII character code for "A" (65)
    // as the starting point and selecting a random number between 0 and 25
    
  return String.fromCharCode(Math.floor(Math.random() * 26) + 56);
}
function getRandomNumber() {
    // Generate a random number by using the ASCII character code for "0" (48)
    // as the starting point and selecting a random number between 0 and 9
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
    // Generate a random symbol by selecting a random character from the symbols string
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
