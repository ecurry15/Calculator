const calcBody = document.querySelector('.calc-body');
const calcDisplay = document.querySelector('.calc-display');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const buttons = document.querySelectorAll('.button');
const operatorButtons = document.querySelectorAll('.button-operator');
const decimalButton = document.querySelector('#decimal');
let inputValue1 = "0";
let inputValue2 = "";
let currentInput = 1;
let operatorClicked = false;
let equalsButtonClicked = false;
let decimalClicked = false;



// Operators ---
const addValue = function (value1, value2) {
  if ((value1 + value2) % 1 != 0) {
    return (value1 + value2).toFixed(2);
        } else {
          return (value1 + value2);
        }
  };
  
  const subtractValue = function (value1, value2) {
    if ((value1 - value2) % 1 != 0) {
      return (value1 - value2).toFixed(2);
          } else {
            return (value1 - value2);
          }
  };
    
  const multiplyValue = function (value1, value2) {
    if ((value1 * value2) % 1 != 0) {
      return (value1 * value2).toFixed(2);
          } else {
            return (value1 * value2);
          }
  };
      
  const divideValue = function (value1, value2) {
    if ((value1 / value2) % 1 != 0) {
return (value1 / value2).toFixed(2);
    } else {
      return (value1 / value2);
    }
  };
//Operators End --------------

//operateSelection updates based on which operator is clicked-
//Operate() then runs with operateChoices[operateSelection] as its 1st paramater-
   const operateChoices = [addValue, subtractValue, multiplyValue, divideValue];
   let operateSelection = 5;
//-----

//Clear And Delete Click Listners -------
clearButton.addEventListener('mousedown', function () {
  clearButton.id = "clear-active";
  currentInput = 1;
  inputValue1 = "0";
  inputValue2 = "";
  calcDisplay.textContent = 0;
  operatorClicked = false;
  equalsButtonClicked = false;
  decimalClicked = false;
});
//Clear MouseUp -----
clearButton.addEventListener('mouseup', function () {
  clearButton.id = "clear";
});
//Delete MouseDown ----
deleteButton.addEventListener('mousedown', function () {
  deleteButton.id = "delete-active";
  if (currentInput == 1) {
inputValue1 = inputValue1.substring(0, inputValue1.length - 1);
calcDisplay.textContent = inputValue1;
  } else if (currentInput == 2) {
    inputValue2 = inputValue2.substring(0, inputValue2.length - 1);
    calcDisplay.textContent = inputValue2;
  } else if (currentInput == "display") {
    inputValue1 = inputValue1.toString().slice(0, -1);
    calcDisplay.textContent = inputValue1;
  };

  if (inputValue1 === "") {
    equalsButtonClicked = false;
    currentInput = 1;
  }
});
//Delete MouseUp ----
deleteButton.addEventListener('mouseup', function () {
  deleteButton.id = "delete";
});
//Clear And Delete Click Listners End-------


//Decimal Click ----------------
decimalButton.addEventListener('mousedown', function() {
  if (equalsButtonClicked === false && decimalClicked === false) {
    decimalButton.id = "active-id";
    decimalClicked = true;
    if (currentInput === 1) {
      if (inputValue1 === "0") {
        inputValue1 = decimalButton.textContent;
        } else {
        inputValue1 += decimalButton.textContent;
        };
        if(inputValue1.length < 10) {
          calcDisplay.textContent = inputValue1;
        };
    } else {
      if (inputValue1 === "0") {
        inputValue2 = decimalButton.textContent;
        } else {
        inputValue2 += decimalButton.textContent;
        };
        if(inputValue2.length < 10) {
          calcDisplay.textContent = inputValue2;
        };
    }
  }
});
//Decimal Mouse up -------
decimalButton.addEventListener('mouseup', function() {
decimalButton.id = "decimal";
});
//Decimal Click END --------

//Number Button click ------------
buttons.forEach(button => button.addEventListener('mousedown', function () {
 if (equalsButtonClicked === false) {
  button.className = "active-button";
  if (currentInput === 1) {
    if (inputValue1 === "0") {
      inputValue1 = button.textContent;
      } else {
      inputValue1 += button.textContent;
      };
      if(inputValue1.length < 10) {
        calcDisplay.textContent = inputValue1;
      };
  } else {
    if (inputValue1 === "0") {
      inputValue2 = button.textContent;
      } else {
      inputValue2 += button.textContent;
      };
      if(inputValue2.length < 10) {
        calcDisplay.textContent = inputValue2;
      };
  }
 }
  
}));

//Number Button Mouse Up --------------
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
//Number Button click End ----

//Operators Button click ----
operatorButtons.forEach(button => button.addEventListener('mousedown', function () {
  if (operatorClicked === false) {
    decimalClicked = false;
if (button.id === "add") {
    button.id = "active-id";
    inputValue1 += button.textContent;
    currentInput = 2;
    operatorClicked = true;
    equalsButtonClicked = false;
    operateSelection = 0;
  } else if (button.id === "subtract") {
    button.id = "active-id";
    inputValue1 += button.textContent;
    currentInput = 2;
    operatorClicked = true;
    equalsButtonClicked = false;
    operateSelection = 1;
  } else if (button.id === "multiply") {
    button.className = "active-button";
    inputValue1 += button.textContent;
    currentInput = 2;
    operatorClicked = true;
    equalsButtonClicked = false;
    operateSelection = 2;
  } else  if (button.id === "divide") {
button.className = "active-button";
inputValue1 += button.textContent;
currentInput = 2;
equalsButtonClicked = false;
operatorClicked = true;
operateSelection = 3;
  };
  calcDisplay.textContent = inputValue1;
  } else if (operatorClicked === true) {
   if (inputValue2 != "" && button.id === "equals") {
      button.id = "equals-active";
      if (operateSelection == 3 && inputValue2 == 0) {
        inputValue1 = "0";
        alert("Can not divide by 0");
        calcDisplay.textContent = "Error";
        currentInput = 1;
        operatorClicked = false;
        inputValue2 = "";
      } else {
        inputValue1 = operate(operateChoices[operateSelection], parseFloat(inputValue1), parseFloat(inputValue2));
        calcDisplay.textContent = inputValue1;
        operatorClicked = false;
        inputValue2 = "";
        currentInput = "display";
        equalsButtonClicked = true;
      }
    }
  }
}));

//Operator Mouse Up -----
operatorButtons.forEach(button => button.addEventListener('mouseup', function () {
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
//Operator Click End ----

//takes user's 1st and 2nd input and calls the function for the specified operator -
 const operate = function (operator, value1, value2) {
   return operator(value1, value2);
 }

 

window.addEventListener('keydown', function(e) {
const keyPressed = document.querySelector(`div[data-key="${e.keyCode}"]`);

if (equalsButtonClicked === false) {
  keyPressed.className = "active-button";
  if (currentInput === 1) {
    if (inputValue1 === "0") {
      inputValue1 = keyPressed.textContent;
      } else {
      inputValue1 += keyPressed.textContent;
      };
      if(inputValue1.length < 10) {
        calcDisplay.textContent = inputValue1;
      };
  } else {
    if (inputValue1 === "0") {
      inputValue2 = keyPressed.textContent;
      } else {
      inputValue2 += keyPressed.textContent;
      };
      if(inputValue2.length < 10) {
        calcDisplay.textContent = inputValue2;
      };
  }
 }

});

window.addEventListener('keyup', function() {

});
