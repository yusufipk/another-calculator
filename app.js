// Theme
const theme1 = document.getElementById("theme1");
const theme2 = document.getElementById("theme2");
const theme3 = document.getElementById("theme3");

if (localStorage.getItem("theme") === null) {
  localStorage.setItem("theme", "theme1");
}

switch (localStorage.getItem("theme")) {
  case "theme1":
    theme1.checked = true;
    break;
  case "theme2":
    theme2.checked = true;
    break;
  case "theme3":
    theme3.checked = true;
    break;
}

theme1.addEventListener("click", () => {
  theme2.checked = false;
  theme3.checked = false;
  localStorage.setItem("theme", "theme1");
});
theme1.addEventListener("click", changeTheme);

theme2.addEventListener("click", () => {
  theme1.checked = false;
  theme3.checked = false;
  localStorage.setItem("theme", "theme2");
});
theme2.addEventListener("click", changeTheme);

theme3.addEventListener("click", () => {
  theme1.checked = false;
  theme2.checked = false;
  localStorage.setItem("theme", "theme3");
});
theme3.addEventListener("click", changeTheme);

function changeTheme() {
  if (theme1.checked) {
    document.body.setAttribute("data-theme", "");
  } else if (theme2.checked) {
    document.body.setAttribute("data-theme", "light");
  } else if (theme3.checked) {
    document.body.setAttribute("data-theme", "purple");
  }
}

changeTheme();

// Functionality
class Calculator {
  constructor(prevOperandTextElement, currentOperandElement) {
    this.prevOperandTextElement = prevOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice("0", -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand =
      this.currentOperand.toString() + number.toString("number");
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;

    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "*":
        computation = prev * current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    this.prevOperandTextElement.innerText = this.getDisplayNumber(
      this.prevOperand
    );

    if (this.operation != undefined) {
      this.prevOperandTextElement.innerText = `${this.getDisplayNumber(
        this.prevOperand
      )} ${this.operation}`;
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-del]");
const reset = document.querySelector("[data-reset]");
const prevOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  prevOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

reset.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

document.body.addEventListener("keydown", (e) => {
  if (isNaN(e.key) === false || e.key === ".") {
    calculator.appendNumber(e.key);
    calculator.updateDisplay();
  } else if (e.key === "+" || e.key === "/" || e.key === "*" || e.key === "-") {
    calculator.chooseOperation(e.key);
    calculator.updateDisplay();
  } else if (e.key === "Enter") {
    calculator.compute();
    calculator.updateDisplay();
  } else if (e.key === "Backspace") {
    calculator.delete();
    calculator.updateDisplay();
  } else if (e.key === "Delete") {
    calculator.clear();
    calculator.updateDisplay();
  } else {
    return;
  }
});
