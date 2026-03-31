let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;

        case '=':
            if (previousOperator === null) return;
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;

        case '←':
            buffer = buffer.length === 1 ? "0" : buffer.slice(0, -1);
            break;

        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0") return;

    const floatBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }

    previousOperator = symbol;
    buffer = "0";
}

function flushOperation(number) {
    if (previousOperator === '+') {
        runningTotal += number;
    } else if (previousOperator === '−') {
        runningTotal -= number;
    } else if (previousOperator === '×') {
        runningTotal *= number;
    } else if (previousOperator === '÷') {
        if (number === 0) {
            alert("Cannot divide by 0");
            runningTotal = 0;
            buffer = "0";
            previousOperator = null;
            return;
        }
        runningTotal /= number;
    }
}

function handleNumber(numberString) {
    buffer = buffer === "0" ? numberString : buffer + numberString;
}

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener("click", function (event) {
            if (event.target.tagName === 'BUTTON') {
                buttonClick(event.target.innerText.trim());
            }
        });
}

init();