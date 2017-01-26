'use strict';

// let inpData = document.querySelector('[data-calc]');


// const buttonInput = document.querySelector('.button-input');
// const buttons = document.querySelectorAll('[data-value]');
var display = document.querySelector('.enter-field');
var numbers = document.querySelectorAll('.number');
var operators = document.querySelectorAll('.operator');
var clearLastNumber = document.querySelector('[data-value="CE"]');
var clearAll = document.querySelector('[data-value="C"]');
var deleteLastSymbol = document.querySelector('[data-value="«"]');
var sqrt = document.getElementById('sqrt');
var equal = document.getElementById('equal');
// a variable, that stores current number
var number = '';
var operator = '';
// a variable, that stores previous number
var firstNumber = '';
// display current number on the screen
display.innerText = '0';
var val = void 0;
// a variable, that stores value after evaluation
var result = '';

function addNumber(e) {
  if (display.innerText) {
    display.innerText = number;
  }

  if (e.target.classList.contains('number')) {
    val = e.target.dataset.value;
    number += val;
    console.log(number);
    display.innerText = number;
  } else {
    return false;
  }
}

function addOperator(e) {
  val = e.target.dataset.value;
  operator = val;
  firstNumber = number;
  number = '';
  // console.log(firstNumber, number, operator);
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
    result = (parseFloat(firstNumber) / parseFloat(number)).toString(10);
    console.log(result);
  }
  display.innerText = result;
  firstNumber = '';
  number = '';
  result = '';
}

function clearLNumb() {
  // console.log(number + 'first console');

  number = '';
  display.innerText = '0';
  console.log(firstNumber, number + 'second console');
}

function cleanAll() {
  // console.log(firstNumber, operator, number, result, 'first console');

  firstNumber = '';
  operator = '';
  number = '';
  result = '';
  display.innerText = '0';
  // console.log(firstNumber, operator, number, result, 'second console');
}

function delLastSymbol(e) {
  addNumber(e);
  // let length = number.length;
  // console.log(number + 'before del');
  number = number.substring(0, number.length - 1);
  // console.log(number + 'after del');
}

function findSqrt() {
  if (firstNumber !== '') {
    display.innerText = "Err";
    return false;
  }

  number = Math.sqrt(parseInt(number, 10)).toString();
  result = number.length > 15 ? parseFloat(number).toFixed(15) : number;

  // console.log(result);

  display.innerText = result;
  number = '';
  result = '';
}

function addGap() {
  if (number.length % 3 === 0) {
    number += 'x';
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

equal.addEventListener('click', evaluate);

//# sourceMappingURL=script-compiled.js.map