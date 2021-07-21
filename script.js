const allOperations = document.getElementById('operation');
const displayUp = document.getElementById('display-up');
const displayMid = document.getElementById('display-mid');
const displayDown = document.getElementById('display-down');
const currentHistoryUp = document.getElementById('txt1');
const currentHistoryMid = document.getElementById('txt2');
const currentHistoryDown = document.getElementById('txt3');
const br = document.createElement("br");
const newLine1 = document.getElementById('newline1');
const newLine2 = document.getElementById('newline2');
const numberButtons = document.getElementsByClassName('num');
const dotButton = document.getElementById('dot');
const plusMinusButton = document.getElementById('plus-minus');
const operatorButtons = document.getElementsByClassName('operator');
const equalButton = document.getElementById('equal');
const arrowButton = document.getElementById('arrow');
const clearScreenButton = document.getElementById('clearScreen');
const startButton = document.getElementById('start');
let stop = false;
let currentValue = '';
let plusMinusButtonStatus = false;
let currentDisplayedNumber = [];
let num = [...numberButtons];
let operators = [...operatorButtons];
displayDown.innerText = '';
let lastOperation = '';

let calculationObject = {
    result: '',
    firstNumber: '',
    secondNumber: '',
    isClean: true,
    isNumber: false,
    isOperator: false,
    isReset: false,
    isSign: false,
    firstOperation: '',
    secondOperation: '',
    lastOperation: '',
    needsTwoNumber: true
};
const CorrectDisplayFunction = () => {
    if (displayDown.innerText.length < 40) {
        if (displayDown.innerText.length > 12 && displayDown.innerText.length < 18) displayDown.style.fontSize = `26px`;
        else if (displayDown.innerText.length >= 18 && displayDown.innerText.length < 24) displayDown.style.fontSize = `18px`;
        else if (displayDown.innerText.length >= 24) displayDown.style.fontSize = `12px`;
        stop = false;
    } else if (displayDown.innerText.length > 40) displayDown.style.fontSize = `10px`
    else stop = true;
}

const updateDisplay = () => {
    displayDown.innerText = currentDisplayedNumber.join('');
    CorrectDisplayFunction();
}

const undoAction = () => {
    currentDisplayedNumber.pop();
    updateDisplay();
}

const clearScreanAction = () => {
    currentDisplayedNumber = [];
    displayDown.style.fontSize = `38px`;
    updateDisplay();
}

const addRemoveMinusSign = (pMButtonStatus) => {
    if (!pMButtonStatus && currentDisplayedNumber.length > 0) currentDisplayedNumber.splice(0, 0, "-");
    else currentDisplayedNumber.shift();
}

const updateDisplayBasedOnSign = (pMButtonStatus) => {
    updateDisplay();
    return !pMButtonStatus;
}


const plusMinusAction = () => {
    addRemoveMinusSign(plusMinusButtonStatus);
    plusMinusButtonStatus = updateDisplayBasedOnSign(plusMinusButtonStatus);
}

const addPeriod = () => {
    if (!currentDisplayedNumber.includes('.')) currentDisplayedNumber.push('.');
    displayDown.innerText = currentDisplayedNumber.join('');
}

const addNumber = (e) => {
    if (!stop && allOperations.getAttribute('value') == 'on') {
        currentDisplayedNumber.push(e.target.innerText);
        updateDisplay();
    }
}

num.forEach(element => { element.addEventListener('click', addNumber) });


// these buttons are special
// the AC, =, 1/x, x^2, rad(x) and % should be added 
arrowButton.addEventListener('click', undoAction);
plusMinusButton.addEventListener('click', plusMinusAction)
dotButton.addEventListener('click', addPeriod);
clearScreenButton.addEventListener('click', clearScreanAction);


const plus = (num1, num2) => {
    return num1.plus(num2).round(4).valueOf();
}
const sub = (num1, num2) => {
    return num1.minus(num2).valueOf();
}
const mul = (num1, num2) => {
    return num1.times(num2).valueOf();
}
const divide = (num1, num2) => {
    return num1.div(num2).round(4).valueOf();
}
const equal = () => {
    return calculationObject.result;
}

const getResult = (selectedOperator, num1, num2) => {
    switch (selectedOperator) {
        case 'plus':
            return plus(num1, num2);
        case 'sub':
            return sub(num1, num2);
        case 'mul':
            return mul(num1, num2);
        case 'divide':
            return divide(num1, num2);
        case 'equal':
            return equal();
        default:
            break;
    }
}

allOperations.addEventListener('click', function (e) {
    arrowButton.disabled = false;
    plusMinusButton.disabled = false;
    if (!calculationObject.firstNumber && !calculationObject.secondNumber) {
        CorrectDisplayFunction();
        if (e.target.className.includes('operator') && currentDisplayedNumber.length > 0) {
            calculationObject.firstNumber = currentDisplayedNumber.join('');
            allOperations.setAttribute('value', 'off');
            currentHistoryUp.innerText = calculationObject.firstNumber;
            // newLine1.appendChild(br);
            // newLine2.appendChild(br);
            currentHistoryMid.innerText = e.target.innerText;
            // currentHistoryDown.innerText = '';
            calculationObject.lastOperation = e.target.id;
            currentDisplayedNumber = [];
        }
    } else if (calculationObject.firstNumber && !calculationObject.secondNumber) {
        allOperations.setAttribute('value', 'on');
        if ((!e.target.className.includes('operator') && !e.target.className.includes('reset')) && currentDisplayedNumber.length == 0) {
            clearScreanAction();
            currentDisplayedNumber.push(e.target.innerText);
            updateDisplay();
        }
        else if (e.target.className.includes('operator') && currentDisplayedNumber.length > 0) {
            calculationObject.secondNumber = currentDisplayedNumber.join('');
            // currentHistoryDown.innerText = calculationObject.secondNumber;
            console.log('second', calculationObject.secondNumber);
            let num1 = new Big(calculationObject.firstNumber)
            let num2 = new Big(calculationObject.secondNumber)
            calculationObject.result = getResult(calculationObject.lastOperation, num1, num2);
            displayDown.innerText = calculationObject.result;
            CorrectDisplayFunction();
            calculationObject.lastOperation = e.target.id;
            // currentHistoryUp.innerText = calculationObject.result;
            // currentHistoryMid.innerText = e.target.innerText;
            // currentHistoryDown.innerText = '';
            currentDisplayedNumber = [];
        } else if (e.target.className.includes('operator') && !calculationObject.secondNumber) {
            currentHistoryMid.innerText = e.target.innerText;
            calculationObject.lastOperation = e.target.id;
        }
    }
    if (calculationObject.result && calculationObject.secondNumber) {
        // currentHistoryDown.innerText = calculationObject.secondNumber;
        // setTimeout(()=>{}, 100)
        [calculationObject.firstNumber, calculationObject.secondNumber] = [calculationObject.result, ''];
        console.log(calculationObject.firstNumber, calculationObject.secondNumber);
        currentHistoryUp.innerText = calculationObject.result;
        currentHistoryMid.innerText = e.target.innerText;
        currentHistoryDown.innerText = '';
        console.log('new calculation', calculationObject.secondNumber);
    }
    if (calculationObject.result && !calculationObject.secondNumber && e.target.className.includes('operator')) {
        arrowButton.disabled = true;
        plusMinusButton.disabled = true;
        [calculationObject.firstNumber, calculationObject.secondNumber] = [calculationObject.result, ''];
        
        //     // console.log(calculationObject.firstNumber, calculationObject.secondNumber);
        //     currentHistoryUp.innerText = calculationObject.result;
        //     currentHistoryMid.innerText = calculationObject.lastOperation;
        //     // // currentHistoryDown.innerText = '';
    }

})

// console.log('5677999999999999999999999999999999999999999999999'.length)
// console.log('9.999999999999999025625000000000000000974365e+36'.length)



