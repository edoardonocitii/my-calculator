let runningTotal = 0;
let buffer = "0";
let previousOperator;
let waitingForSecondNumber = false;

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
    console.log(symbol)
    switch (symbol) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            waitingForSecondNumber = false;
            break;

        case '=':
            if (previousOperator === null) return;
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            waitingForSecondNumber = false;
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
    const floatBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }

    previousOperator = symbol;
    waitingForSecondNumber = true;
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
            return;
        }
        runningTotal /= number;
    }
}

function handleNumber(numberString) {
    if (waitingForSecondNumber) {
        buffer = numberString;
        waitingForSecondNumber = false;
    } else {
        buffer = buffer === "0" ? numberString : buffer + numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener("click", function (event) {
            // This ensures we ALWAYS catch the button, even if you click the edge
            const button = event.target.closest('button');
            if (button) {
                buttonClick(button.innerText.trim());
            }
        });
}


init();
