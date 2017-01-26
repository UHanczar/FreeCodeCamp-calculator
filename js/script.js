// let inpData = document.querySelector('[data-calc]');


// const buttonInput = document.querySelector('.button-input');
// const buttons = document.querySelectorAll('[data-value]');
const display = document.querySelector('.enter-field');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearLastNumber = document.querySelector('[data-value="CE"]');
const clearAll = document.querySelector('[data-value="C"]');
const deleteLastSymbol = document.querySelector('[data-value="«"]');
const sqrt = document.getElementById('sqrt');
const equal = document.getElementById('equal');
// a variable, that stores current number
let number = '';
let operator = '';
// a variable, that stores previous number
let firstNumber = '';
// display current number on the screen
display.innerText = '0';
let val;
// a variable, that stores value after evaluation
let result = '';



function addNumber(e) {
  if(display.innerText) {
    display.innerText = number;
  }

  if(e.target.classList.contains('number')) {
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
  if(firstNumber === '' && operator === '') {
    return null;
  }

  if(operator === '+') {
    result = (parseFloat(firstNumber) + parseFloat(number)).toString(10);
    console.log(result);
  } else if(operator === '-') {
    result = (parseFloat(firstNumber) - parseFloat(number)).toString(10);
    console.log(result);
  } else if(operator === '*') {
    result = (parseFloat(firstNumber) * parseFloat(number)).toString(10);
    console.log(result);
  } else if(operator === '/') {
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
  if(firstNumber !== '') {
    display.innerText = "Err";
    return false;
  }

  number = Math.sqrt(parseInt(number,10)).toString();
  result = number.length > 15 ? parseFloat(number).toFixed(15) : number;

  // console.log(result);

  display.innerText = result;
  number = '';
  result = '';
}

function addGap() {
  console.log(display);
}

numbers.forEach(number => number.addEventListener('click', addNumber));
operators.forEach(operator => operator.addEventListener('click', addOperator));


clearLastNumber.addEventListener('click', clearLNumb);
clearAll.addEventListener('click', cleanAll);
deleteLastSymbol.addEventListener('click', delLastSymbol);

sqrt.addEventListener('click', findSqrt);

display.addEventListener('change', addGap);

equal.addEventListener('click', evaluate);






