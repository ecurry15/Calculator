const calcBody = document.querySelector('.calc-body');
const calcDisplay = document.querySelector('.calc-display');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const buttons = document.querySelectorAll('.button');
const operatorButtons = document.querySelectorAll('.button-operator');
const decimalButton = document.querySelector('#decimal');
const equalsButton = document.querySelector('#equals');
let inputValue1 = "0";
let inputValue2 = "";
let currentInput = 1;
let operatorClicked = false;
let equalsButtonClicked = false;
let decimalClicked = false;
let keydown = false;
let tooLong = 1000000000;
let disableDelete = false;



// Operator Functions ---
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
//Operator Functions End --------------

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
  disableDelete = false;
  equalsButton.id = "equals";
});
//Clear MouseUp -----
clearButton.addEventListener('mouseup', function () {
  clearButton.id = "clear";
});

//Delete MouseDown ----
deleteButton.addEventListener('mousedown', function () {
  if (!disableDelete) {
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
}
});

//Delete MouseUp ----
deleteButton.addEventListener('mouseup', function () {
  deleteButton.id = "delete";
});

//Delete Key Down ---
window.addEventListener('keydown', function (e) {
const deleteKey = document.querySelector(`div[data-key="${e.keyCode}"]`);
if (deleteKey.textContent === "DELETE") {
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
};
});

//Delete Key Up -----
window.addEventListener('keyup', function(e) {
  const deleteKeyUp = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (deleteKeyUp.textContent === "DELETE") {
    deleteButton.id = "delete";
  }
  }); 
//Clear And Delete Click / Press Listners End-------


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

//Decimal Key Down ----
window.addEventListener('keydown', function(e) {
const decimalpress = document.querySelector(`div[data-key="${e.keyCode}"]`);
if (decimalpress.textContent == "." && equalsButtonClicked === false && decimalClicked === false) {
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
//Decimal KeyUp -----
window.addEventListener('keyup', function(e) {
  const decimalKeyUp = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (decimalKeyUp.textContent === ".") {
    decimalKeyUp.id = "decimal";
  }
});
//Decimal Click / Press END --------

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

//Number key Down ------------
window.addEventListener('keydown', function(e) {
  const keyPressed = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (keyPressed.id >= 0 && keyPressed.id <= 9 && equalsButtonClicked === false && keydown === false && keyPressed.id != "decimal") {
    keyPressed.className = "active-button";
    keydown = true;
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
    };
  }
});

//Number Key Up ------
window.addEventListener('keyup', function(e) {
  const keyUp = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (keyUp.id >= 0 && keyUp.id <= 9 && keyUp.id != "decimal" && keyUp.id != "delete") {
    keyUp.className = "button";
    keydown = false;
  }
});
//Numbers Click / Press End ----

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
if (inputValue1 <= tooLong) {
  calcDisplay.textContent = inputValue1;
  currentInput = "display";
  operatorClicked = false;
        inputValue2 = "";
        equalsButtonClicked = true;
} else {
  calcDisplay.textContent = "Error";
  alert("Value is too Large, please press clear to continue");
  inputValue1 = "";
  currentInput = 1;
  operatorClicked = true;
  decimalClicked = true;
  equalsButtonClicked = true;
  disableDelete = true;
}
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

//Operator Key Down ----
window.addEventListener('keydown', function(e) {
const operatorDown = document.querySelector(`div[data-key="${e.keyCode}"]`);
if (operatorClicked === false) { 
  if (operatorDown.id === "add") {
      operatorDown.id = "active-id";
      inputValue1 += operatorDown.textContent;
      currentInput = 2;
      operatorClicked = true;
      equalsButtonClicked = false;
      operateSelection = 0;
      decimalClicked = false;
      calcDisplay.textContent = inputValue1;
    } else if (operatorDown.id === "subtract") {
      operatorDown.id = "active-id";
      inputValue1 += operatorDown.textContent;
      currentInput = 2;
      operatorClicked = true;
      equalsButtonClicked = false;
      operateSelection = 1;
      decimalClicked = false;
      calcDisplay.textContent = inputValue1;
    } else if (operatorDown.id === "multiply") {
      operatorDown.className = "active-button";
      inputValue1 += operatorDown.textContent;
      currentInput = 2;
      operatorClicked = true;
      equalsButtonClicked = false;
      operateSelection = 2;
      calcDisplay.textContent = inputValue1;
    } else  if (operatorDown.id === "divide") {
      operatorDown.className = "active-button";
      inputValue1 += operatorDown.textContent;
      currentInput = 2;
      equalsButtonClicked = false;
      operatorClicked = true;
      operateSelection = 3;
      calcDisplay.textContent = inputValue1;
        };
} else if (operatorClicked === true) {
  if (inputValue2 != "" && operatorDown.id === "equals") {
     if (operateSelection == 3 && inputValue2 == 0) {
       inputValue1 = "0";
       alert("Can not divide by 0");
       calcDisplay.textContent = "Error";
       currentInput = 1;
       operatorClicked = false;
       inputValue2 = "";
       operatorDown.id = "equals-active";
     } else {
       inputValue1 = operate(operateChoices[operateSelection], parseFloat(inputValue1), parseFloat(inputValue2));
       calcDisplay.textContent = inputValue1;
       operatorClicked = false;
       inputValue2 = "";
       currentInput = "display";
       equalsButtonClicked = true;
       operatorDown.id = "equals-active";
     }
   }
 }
});

//Operator Key Up -----
window.addEventListener('keyup', function(e) {
  const operatorUp = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (operatorUp.id != "decimal" && operatorUp.id != "delete") {
  if (operatorUp.id === "active-id" && operatorUp.textContent === "+") {
    operatorUp.id = "add";
  } else if (operatorUp.id === "active-id" && operatorUp.textContent === "-") {
operatorUp.id = "subtract";
  } else if (operatorUp.id === "equals-active") {
operatorUp.id = "equals";
  }else {
    operatorUp.className = "button";
  };
};
})
//Operator Click / Press End ----

//takes user's 1st and 2nd input and calls the function for the specified operator -
 const operate = function (operator, value1, value2) {
   return operator(value1, value2);
 };

 


