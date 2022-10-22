const buttons = document.querySelectorAll("button");
const display = document.getElementById("display");

let newCalculation = false;
let input = [];
let numArray = [];
let operator = "";
let result = 0;

const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

const operate = (operator, num1, num2) => {
    switch(operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
        default:
            console.log("operate error")
            break;
    }

}

const registerButton = (e) => {
    let button = e.srcElement.innerText;
    switch(button) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            displayDigit(button);
            numArray.push(parseInt(button));
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            displayDigit(` ${button}  `);
            input.push(parseInt(numArray.join("")));
            input.push(button);
            numArray.length = 0;
            break;
        case "=":
            input.push(parseInt(numArray.join("")));
            result = calculate();
            clear();
            displayDigit(result); 
            newCalculation = true;
            break;
        case "C":
            clear();
            break;
    }
};

const calculate = () => {
    let num1 = 0;
    let num2 = 0;
    let total = 0;
    let operatorIndex = -1;

    do {
        operatorIndex = getIndex();
        num1 = input[operatorIndex - 1];
        operator = input[operatorIndex];
        num2 = input[operatorIndex + 1];

        total = operate(operator, num1, num2);
        
        if (input.length) {
            input[operatorIndex - 1] = total;
            input.splice(operatorIndex, 2);
        }
        else {
            input.splice(operatorIndex - 1, 3);
        }

    } while (input.length > 1);

    return total;
}

const getIndex = () => {
    let location = input.findIndex((element, index, array) => {
        return (element == "*" || element =="/");
    });

    if (location == -1) {
        return input.findIndex((element, index, array) => {
            return (element == "+" || element =="-");
        });
    }
    return location;
}

const displayDigit = (str) => {
    if (newCalculation) {
        display.innerText = "";
        newCalculation = false;
    }
    display.innerText += str; 
}

const clear = () => {
    numArray.length = 0;
    input.length = 0;
    display.innerText = "";
}

buttons.forEach(button => {
    button.addEventListener("click", registerButton);
});
