const calcBody = document.querySelector('.calc-body');
const calcDisplay = document.querySelector('.calc-display');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const buttons = document.querySelectorAll('.button');
let inputValue1 = "0";

clearButton.addEventListener('mousedown', function () {
  clearButton.id = "clear-active";
});

clearButton.addEventListener('mouseup', function () {
  clearButton.id = "clear";
});

deleteButton.addEventListener('mousedown', function () {
  deleteButton.id = "delete-active";
});

deleteButton.addEventListener('mouseup', function () {
  deleteButton.id = "delete";
});


buttons.forEach(button => button.addEventListener('mousedown', function () {
  if (button.id === "add" || button.id === "subtract") {
    button.id = "active-id";
  } else if (button.id === "equals") {
button.id = "equals-active";
  } else {
button.className = "active-button";
  };
if (inputValue1 === "0") {
inputValue1 = button.textContent;
} else {
inputValue1 += button.textContent;
}
calcDisplay.textContent = inputValue1;
}));



buttons.forEach(button => button.addEventListener('mouseup', function () {
  if (button.id === "active-id" && button.textContent === "+") {
    button.id = "add";
  } else if (button.id === "active-id" && button.textContent === "-") {
button.id = "subtract";
  } else if (button.id === "equals-active") {
button.id = "equals";
  }else {
    button.className = "button";
  };
}));

// Operators ---
const addValue = function (value1, value2) {
return value1 + value2;
};

const subtractValue = function (value1, value2) {
  return value1 - value2;
};
  
const multiplyValue = function (value1, value2) {
  return value1 * value2;
};
    
const divideValue = function (value1, value2) {
  return value1 / value2;
};
 //Operators End ---

 const operate = function (operator, value1, value2) {
   return operator(value1, value2);
 }

 console.log(operate(addValue, 10, 8));