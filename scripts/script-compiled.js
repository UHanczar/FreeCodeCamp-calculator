'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var display = document.querySelector('.enter-field');
var evalDiv = document.querySelector('.eval-div');
var currentResult = document.querySelector('.current-result');
var standardButtons = document.querySelectorAll('.standard-button');
var numbers = document.querySelectorAll('.number');
var operators = document.querySelectorAll('.operator');
var clearLastNumber = document.querySelector('[data-value="CE"]');
var clearAll = document.querySelector('[data-value="C"]');
var deleteLastSymbol = document.querySelector('[data-value="«"]');
var sqrt = document.getElementById('sqrt');
var equal = document.getElementById('equal');

// a variable, that stores current number
var number = '0';
var operator = '';
// a variable, that stores previous number
var firstNumber = '';
// display current number on the screen
currentResult.innerText = '0';
var val = void 0;
// a variable, that stores value after evaluation
var result = '';
// a variable for evaluation process div;
var evaluationProcess = '';

function checkNumberLength() {
  // if(number.length < 8 || result.length < 8) {
  //   display.style.fontSize = 64 + 'px';
  // } else

  if (number.length >= 8 && number.length < 10 || result.length >= 8 && result.length < 10) {
    currentResult.style.fontSize = 54 + 'px';
  } else if (number.length >= 10 && number.length <= 12 || result.length >= 10 && result.length <= 12) {
    currentResult.style.fontSize = 44 + 'px';
  } else if (number.length >= 13 && number.length <= 15 || result.length >= 13 && result.length <= 15) {
    currentResult.style.fontSize = 34 + 'px';
  }
  // else if(number.length > 15 || result.length > 15) {
  //   number = 'Err';
  //   result = 'Err';
  //   display.style.fontSize = 64 + 'px';
  //   number === 'Err' ? display.innerText = number : display.innerText = result;
  // }

  else if (result.length > 15) {
      result = 'Err';
      currentResult.style.fontSize = 64 + 'px';
      currentResult.innerText = result;
    } else if (number.length < 8 && number.length >= 0 || result.length < 8 && result.length >= 0) {
      currentResult.style.fontSize = 64 + 'px';
    }
}

function addNumber(e) {
  val = e.target.dataset.value;
  if (number === '0') {
    number = '';
  }

  if (result !== '') {
    result = '';
    currentResult.innerText = number;
  }

  if (result === 'Err') {
    number = '';
    result = '';
  }

  if (number.length === 15) {
    return false;
  }

  if (number.length === 0 && val === '.') {
    //return false;
    number = '0';
  }

  if (e.target.classList.contains('number')) {
    //val = e.target.dataset.value;
    number += val;
    // console.log(number);
    checkNumberLength();
    currentResult.innerText = number;
  } else {
    return false;
  }
}

function addOperator(e) {
  val = e.target.dataset.value;
  console.log(number, result, operator);

  if (number.length == '0') {
    number = '0';
  }

  // evalDiv.innerText += number;
  // evalDiv.innerText += operator;


  if (firstNumber !== '' && operator !== '' && number !== '') {
    evaluate();
    firstNumber = result;
    //result = 0;
  }

  if (result !== '') {
    firstNumber = result;
    result = '';
    number = '';
    operator = val;
    // evalDiv.innerText += firstNumber;
    // evalDiv.innerText += operator;
  } else {
    operator = val;
    firstNumber = number;
    number = '';
    // evalDiv.innerText += number;
    // evalDiv.innerText += operator;
  }

  // evalDiv.innerText += firstNumber + operator;


  console.log('fNum:' + firstNumber, 'num:' + number, 'op:' + operator);
}

function evaluate() {
  if (firstNumber === '' && operator === '') {
    return null;
  }

  if (operator === '+') {
    result = (parseFloat(firstNumber) + parseFloat(number)).toString(10);
    console.log(result);
  } else if (operator === '-') {
    result = (parseFloat(firstNumber) - parseFloat(number)).toString(10);
    console.log(result);
  } else if (operator === '*') {
    result = (parseFloat(firstNumber) * parseFloat(number)).toString(10);
    console.log(result);
  } else if (operator === '/') {
    result = (parseFloat(firstNumber) / parseFloat(number)).toFixed(10);
    console.log(result);
  }

  currentResult.innerText = result;
  checkNumberLength();
  firstNumber = '';
  number = '';
  // result = '';

}

function clearLNumb() {
  // console.log(number + 'first console');

  number = '';

  currentResult.innerText = '0';
  currentResult.style.fontSize = 64 + 'px';

  // console.log(firstNumber, number + 'second console');
}

function cleanAll() {
  console.log(firstNumber, operator, number, result, 'first console');

  firstNumber = '';
  operator = '';
  number = '';
  result = '';

  currentResult.innerText = '0';
  currentResult.style.fontSize = 64 + 'px';
  console.log(firstNumber, operator, number, result + 'second console');
}

function delLastSymbol(e) {
  addNumber(e);
  // let length = number.length;
  // console.log(number + 'before del');

  number = number.substring(0, number.length - 1);
  currentResult.innerText = number;
  checkNumberLength();
  // console.log(number);
  // console.log(number + 'after del');
  if (number === '') {
    currentResult.innerText = 0;
  }
}

function findSqrt() {
  if (firstNumber !== '') {
    currentResult.innerText = "Err";
    return false;
  }

  var num = Math.sqrt(parseInt(number, 10));
  number = num.toString();
  console.log(number.length, typeof num === 'undefined' ? 'undefined' : _typeof(num));
  result = number.length > 15 ? parseFloat(num).toFixed(10) : number;

  console.log(result);

  currentResult.innerText = result;
  checkNumberLength();
  number = '';
  result = '';
}

function addGap() {
  if (number.length % 3 === 0) {
    number += 'x';
  }
}

function evaluateHist(e) {
  var value = e.target.dataset.value;

  evalDiv.innerText += value;

  if (value === '=') {
    evalDiv.innerText = '';
  }
}

numbers.forEach(function (number) {
  return number.addEventListener('click', addNumber);
});
operators.forEach(function (operator) {
  return operator.addEventListener('click', addOperator);
});

clearLastNumber.addEventListener('click', clearLNumb);
clearAll.addEventListener('click', cleanAll);
deleteLastSymbol.addEventListener('click', delLastSymbol);

sqrt.addEventListener('click', findSqrt);

// display.addEventListener('change', addGap);

standardButtons.forEach(function (standardButton) {
  return standardButton.addEventListener('click', evaluateHist);
});

equal.addEventListener('click', evaluate);

//# sourceMappingURL=script-compiled.js.map