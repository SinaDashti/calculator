const allOperations = document.getElementById('operation');
const displayUp = document.getElementById('display-up');
const displayMid = document.getElementById('display-mid');
const displayDown = document.getElementById('display-down');
const currentHistoryUp = document.getElementById('txt1');
const currentHistoryMid = document.getElementById('txt2');
const currentHistoryDown = document.getElementById('txt3');
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
let OPERATORSTATUS = false;
let ARROWSTATUS = false;
let CLEANSTATUS = false;
let RESETSTATUS = false;
let stop = false;
let currentValue = '';
let plusMinusButtonStatus = false;
let currentDisplayedNumber = [];
let num = [...numberButtons];
let operators = [...operatorButtons];
displayDown.innerText = '';
let lastOperation = '';

let calculationObject = {
    result: '0',
    secondNumber: '',
    isClean: false,
    isNumber: false,
    isOperator: false,
    isSign: false,
    lastOperation: '',
    needsTwoNumber: true
};

const CorrectDisplayFunction = () => {
    if (displayDown.innerText.length < 40) {
        if (displayDown.innerText.length > 12 && displayDown.innerText.length < 18) displayDown.style.fontSize = `26px`;
        else if (displayDown.innerText.length >= 18 && displayDown.innerText.length < 24) displayDown.style.fontSize = `18px`;
        else if (displayDown.innerText.length >= 24) displayDown.style.fontSize = `12px`;
        stop = false;
    } else stop = true;
}

const updateDisplay = () => {
    displayDown.innerText = currentDisplayedNumber.join('');
    CorrectDisplayFunction();
}

const undoAction = () => {
    OPERATORSTATUS = false;
    ARROWSTATUS = true;
    currentDisplayedNumber.pop();
    updateDisplay();
    // console.log('d', displayDown.innerText.length, 'c', currentDisplayedNumber.length);
}

const clearSCreanAction = () => {
    currentDisplayedNumber = [];
    displayDown.style.fontSize = `38px`;
    updateDisplay();
}

const addRemoveMinusSign = (pMButtonStatus) => {
    if (!pMButtonStatus) currentDisplayedNumber.splice(0, 0, "-");
    else currentDisplayedNumber.shift();
}

const updateDisplayBasedOnSign = (pMButtonStatus) => {
    updateDisplay();
    return !pMButtonStatus;
}


const plusMinusAction = () => {
    OPERATORSTATUS = false;
    ARROWSTATUS = false;
    addRemoveMinusSign(plusMinusButtonStatus);
    plusMinusButtonStatus = updateDisplayBasedOnSign(plusMinusButtonStatus);
    // console.log('a', currentDisplayedNumber);
}

const addPeriod = () => {
    if (!currentDisplayedNumber.includes('.')) currentDisplayedNumber.push('.');
    displayDown.innerText = currentDisplayedNumber.join('');
}

num.forEach(element => {
    element.addEventListener('click', function (e) {
        // below condition is important
        if (!OPERATORSTATUS && stop == false) {
            currentDisplayedNumber.push(e.target.innerText);
            updateDisplay();
        }
        // console.log('d', displayDown.innerText.length, 'c', currentDisplayedNumber.length);
    })
});

// operators.forEach(element => {
//     element.addEventListener('click', function () {
//         OPERATORSTATUS = true;
//         ARROWSTATUS = false;
//         // lastOperation = element;
//     })
// });

// these buttons are special
// the AC, =, 1/x, x^2, rad(x) and % should be added 
arrowButton.addEventListener('click', undoAction);
plusMinusButton.addEventListener('click', plusMinusAction)
dotButton.addEventListener('click', addPeriod);
clearScreenButton.addEventListener('click', clearSCreanAction);

allOperations.addEventListener('click', function (e) {
    // console.log(e.target.className.includes('num'));
    // console.log(currentDisplayedNumber[currentDisplayedNumber.length - 1]);
    // console.log(currentDisplayedNumber);
    // console.log(e.target.className);
    if (!e.target.className.includes('reset') && !e.target.className.includes('operator') && stop == false) {
        console.log('current', e.target.innerText);
        // currentDisplayedNumber.push(e.target.innerText);
        // updateDisplay();
    }
    // if (OPERATORSTATUS && !ARROWSTATUS) {
    //     if (e.target.className.includes('num')) {
    //         console.log('finnaly', displayDown.innerText);
    //         // console.log(lastOperation.className)
    //         console.log(currentDisplayedNumber)
    //         OPERATORSTATUS = false;
    //         ARROWSTATUS = true;
    //         // currentDisplayedNumber = [];
    //     }
    // }

})
// let num1 = new Big('-888')
// let num2 = new Big('888')
// console.log(num1.add(num2).valueOf())


