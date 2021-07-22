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
displayDown.innerText = '0';
let lastOperation = '';
let calculationObject = {
    result: '',
    firstNumber: '',
    secondNumber: '',
    lastOperation: '',
    reset: function(){
        this.result = '';
        this.firstNumber = '';
        this.secondNumber = '';
        this.lastOperation = '';
        currentDisplayedNumber = [];
    }
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
    // console.log('d', displayDown.innerText.length, 'c', currentDisplayedNumber.length);
}

const clearHistory = () => {
    [currentHistoryUp.innerText, currentHistoryMid.innerText, currentHistoryDown.innerText] = ['', '', ''];
    
}

const clearScreanAction = () => {
    currentDisplayedNumber = [];
    displayDown.style.fontSize = `38px`;
    updateDisplay();
}

const startAction = () => {
    calculationObject.reset();
    clearScreanAction();
    clearHistory();
    setTimeout(()=> displayDown.innerText += '0', 10);
}


const plusMinusAction = () => {
    let check = new Big(currentDisplayedNumber.join(''));
    if(!check.lt(Big(0)) && currentDisplayedNumber.length > 0) currentDisplayedNumber.splice(0, 0, "-");
    else currentDisplayedNumber.shift();
    updateDisplay();
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
startButton.addEventListener('click', startAction)
const needsOneNumber = (op) => {
    return ['pow2', 'radical', 'oneOver', 'percent'].includes(op)
}

const plus = (num1, num2) => {
    // return num1.plus(num2).valueOf();
    if(num1.plus(num2).valueOf().length > 20) return num1.plus(num2).toPrecision(4);
    else return num1.plus(num2).valueOf();
}
const sub = (num1, num2) => {
    // return num1.minus(num2).valueOf();
    if(num1.minus(num2).valueOf().length > 20) return num1.minus(num2).toPrecision(4);
    else return num1.minus(num2).valueOf();
}
const mul = (num1, num2) => {
    // return num1.times(num2).valueOf();
    if(num1.times(num2).valueOf().length > 20) return num1.times(num2).toPrecision(4);
    else return num1.times(num2).valueOf();
}
const divide = (num1, num2) => {
    if(num2.valueOf() !== '0') {
        if(num1.div(num2).valueOf().length > 20) return num1.div(num2).toPrecision(4);
        else return num1.div(num2).valueOf();
    }  
    else{
        setTimeout(()=>{
            displayDown.innerText = 'Cannot divide by zero!';
            CorrectDisplayFunction();
        }, 0);
        setTimeout(()=>startAction(), 1500);
        return '';
    }
}

const pow2 = (num1) => {
    // setTimeout(()=>{
    //     CorrectDisplayFunction();
    // }, 500)
    if(num1.pow(2).valueOf().length > 20) return num1.pow(2).toPrecision(4);
    else return num1.pow(2).valueOf();
}
const radical = (num1) => {
    if(!num1.lt(Big(0))) {
        if(num1.sqrt().valueOf().length > 20) return num1.sqrt().toPrecision(4);
        else  return num1.sqrt().valueOf();
    }  
    else{
        setTimeout(()=>{
            displayDown.innerText = 'Invalid input!';
            CorrectDisplayFunction();
        }, 0);
        setTimeout(()=>startAction(), 1500);
        return '';
    }
}
const oneOver = (num1) => {
    let num2 = new Big('1')
    return divide(num2, num1);
}
const percent = (num1) => {
    let num2 = new Big('100')
    return divide(num1, num2);
}
const equal = () => {
    return calculationObject.result;
}

const getResult = (selectedOperator, num1, num2='0') => {
    switch (selectedOperator) {
        case 'plus':
            return plus(num1, num2);
        case 'sub':
            return sub(num1, num2);
        case 'mul':
            return mul(num1, num2);
        case 'divide':
            return divide(num1, num2);
        case 'pow2':
            return pow2(num1);
        case 'radical':
            return radical(num1);
        case 'oneOver':
            return oneOver(num1);
        case 'percent':
            return percent(num1);
        case 'equal':
            return equal();
        default:
            break;
    }
}

allOperations.addEventListener('click', function (e) {
    if(e.target.id == 'start') clearScreanAction();
    arrowButton.disabled = false;
    plusMinusButton.disabled = false;
    if (!calculationObject.firstNumber && !calculationObject.secondNumber) {
        if (e.target.className.includes('operator') && currentDisplayedNumber.length > 0) {
            calculationObject.firstNumber = currentDisplayedNumber.join('');
            allOperations.setAttribute('value', 'off');
            plusMinusButton.disabled = true;
            currentHistoryUp.innerText = calculationObject.firstNumber;
            // newLine1.appendChild(br);
            // newLine2.appendChild(br);
            currentHistoryMid.innerText = e.target.innerText;
            // currentHistoryDown.innerText = '';
            calculationObject.lastOperation = e.target.id;
            // console.log(needsOneNumber(calculationObject.lastOperation));
            if(needsOneNumber(calculationObject.lastOperation)){
                let num1 = new Big(calculationObject.firstNumber)
                // let num2 = new Big(calculationObject.secondNumber)
                calculationObject.result = getResult(calculationObject.lastOperation, num1);
                displayDown.innerText = calculationObject.result;
                CorrectDisplayFunction()
                // calculationObject.firstNumber = calculationObject.result;
            }
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
        console.log('here');
        arrowButton.disabled = true;
        plusMinusButton.disabled = true;
        if(needsOneNumber(calculationObject.lastOperation)){
            let num1 = new Big(calculationObject.firstNumber)
            // let num2 = new Big(calculationObject.secondNumber)
            console.log('here I am');
            calculationObject.result = getResult(calculationObject.lastOperation, num1);
            displayDown.innerText = calculationObject.result;
            CorrectDisplayFunction()
            // [calculationObject.firstNumber, calculationObject.secondNumber] = [calculationObject.result, ''];
        }
        [calculationObject.firstNumber, calculationObject.secondNumber] = [calculationObject.result, ''];
        //     // console.log(calculationObject.firstNumber, calculationObject.secondNumber);
        //     currentHistoryUp.innerText = calculationObject.result;
        //     currentHistoryMid.innerText = calculationObject.lastOperation;
        //     // // currentHistoryDown.innerText = '';
    }


})


// display update after very big numbers
// refactor the part of precision
// history
