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

function checkNumberLength() {
  // if(number.length < 8 || result.length < 8) {
  //   display.style.fontSize = 64 + 'px';
  // } else

  if (number.length >= 8 && number.length < 10 || result.length >= 8 && result.length < 10) {
    display.style.fontSize = 54 + 'px';
  } else if (number.length >= 10 && number.length <= 12 || result.length >= 10 && result.length <= 12) {
    display.style.fontSize = 44 + 'px';
  } else if (number.length >= 13 && number.length <= 15 || result.length >= 13 && result.length <= 15) {
    display.style.fontSize = 34 + 'px';
  }
  // else if(number.length > 15 || result.length > 15) {
  //   number = 'Err';
  //   result = 'Err';
  //   display.style.fontSize = 64 + 'px';
  //   number === 'Err' ? display.innerText = number : display.innerText = result;
  // }

  else if (result.length > 15) {
      result = 'Err';
      display.style.fontSize = 64 + 'px';
      display.innerText = result;
    } else if (number.length < 8 && number.length >= 0 || result.length < 8 && result.length >= 0) {
      display.style.fontSize = 64 + 'px';
    }
}

function addNumber(e) {
  val = e.target.dataset.value;

  if (result !== '') {
    result = '';
    display.innerText = number;
  }

  if (result === 'Err') {
    number = '';
    result = '';
  }

  if (number.length === 15) {
    return false;
  }

  if (e.target.classList.contains('number')) {
    //val = e.target.dataset.value;
    number += val;
    // console.log(number);
    checkNumberLength();
    display.innerText = number;
  } else {
    return false;
  }
}

function addOperator(e) {

  val = e.target.dataset.value;

  if (result !== '') {
    firstNumber = result;
    result = '';
    number = '';
    operator = val;
  } else {
    operator = val;
    firstNumber = number;
    number = '';
  }

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
    result = (parseFloat(firstNumber) / parseFloat(number)).toString(10);
    console.log(result);
  }

  display.innerText = result;
  checkNumberLength();
  firstNumber = '';
  number = '';
  // result = '';

}

function clearLNumb() {
  // console.log(number + 'first console');

  number = '';
  display.innerText = '0';
  // console.log(firstNumber, number + 'second console');
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
  display.innerText = number;
  checkNumberLength();
  // console.log(number);
  // console.log(number + 'after del');
  if (number === '') {
    display.innerText = 0;
  }
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