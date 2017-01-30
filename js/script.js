//Dom variables
const display = document.querySelector('.enter-field');
const evalDiv = document.querySelector('.eval-div');
const currentResult = document.querySelector('.current-result');
const standardButtons = document.querySelectorAll('.standard-button');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clearLastNumber = document.querySelector('[data-value="CE"]');
const clearAll = document.querySelector('[data-value="C"]');
const point = document.querySelector('[data-value="."]');
const deleteLastSymbol = document.querySelector('[data-value="«"]');
const sqrt = document.getElementById('sqrt');
const equal = document.getElementById('equal');


// a variable, that stores current number
let number = '0';
// a variable stores operator;
let operator = '';
// a variable, that stores previous number
let firstNumber = '';

// a variable, that stores value after evaluation
let result = '';
// display current number on the screen
currentResult.innerText = '0';


// function checks number length to be less than 18 characters  and changes font-size according to number's length
function checkNumberLength() {

  if(number.length >= 8 && number.length < 10 || result.length >= 8 && result.length < 10) {
      currentResult.style.fontSize = 54 + 'px';
  } else if(number.length >= 10 && number.length <= 12 || result.length >= 10 && result.length <= 12) {
      currentResult.style.fontSize = 44 + 'px';
    } else if(number.length >= 13 &&  number.length <= 19  || result.length >= 13 && result.length <= 19) {
      currentResult.style.fontSize = 30 + 'px';
    } else if(number.length > 19 || result.length > 19) {
      result = 'Err';
      currentResult.innerText = result;
      currentResult.style.fontSize = 64 + 'px';

    } else if(number.length < 8 &&  number.length >= 0 || result.length <  8 && result.length >= 0) {
     currentResult.style.fontSize = 64 + 'px';
  }
}


let pointFlag = true;
let counter = 0;




// function adds characters to 'number' varible
function addNumber(e) {
  let val = e.target.dataset.value;





  // condition works, when first character of new number adds, and default value changes
  if(number === '0') {
    number = '';
  }

  // condition works when new number is adding just after evaluation
  if(result !== '') {
    result = '';
    currentResult.innerText = number;
  }

  // if Error - number & result = 0
  if(result === 'Err') {
    number = '';
    result = '';
  }

  // condition prevents adding characters to number, if it is more then 19 characters
  if(number.length === 20) {
    return false;
  }

  // condition works if we press '.' button, so it inserts '0' before '.'
  if(number.length === 0 && val === '.') {
    //return false;
    number = '0';
  }

  if(val === '.' && counter > 0) {
    return false;

  }

  // adding character to number
  if(e.target.classList.contains('number')) {
    val = e.target.dataset.value;
    number += val;
    // console.log(number);
    checkNumberLength();
    currentResult.innerText = number;

  } else {
    return false;
  }

}

function addOperator(e) {
  let val = e.target.dataset.value;
  console.log(number, result, operator);
  counter = 0;

  if(number.length == '0') {
    number = '0';
  }

  if(firstNumber !== '' && operator !== '' && number !== '') {
    evaluate();
    firstNumber = result;
    // result = 0;
  }

  if(result !== '') {
    firstNumber = result;
    // result = '';
    number = '';
    operator = val;
  } else {
    operator = val;
    firstNumber = number;
    number = '';
  }

  // console.log('fNum:' + firstNumber, 'num:' + number, 'op:' + operator);
}

function evaluate() {
  counter = 0;

  if(firstNumber === '' || number === '') {
    return false;
  }

  if(result === undefined || result == isNaN(NaN) ) {
    currentResult.innerText = 'Err';
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

  if(result.length > 19) {
    result = 'Err';
    currentResult.innerText = result;
    currentResult.style.fontSize = 64 + 'px';
  }

  checkNumberLength();
  currentResult.innerText = result;
  firstNumber = '';
  number = '';
  // result = '';
}

function clearLNumb() {
  // console.log(number + 'first console');
  counter = 0;
  number = '';

  if(result !== '' && firstNumber !== '') {
    result = '';
    operator = '';
  }

  currentResult.innerText = '0';
  currentResult.style.fontSize = 64 + 'px';
  // console.log(firstNumber, number + 'second console');
  if(result === undefined || result == isNaN(NaN) ) {
    currentResult.innerText = 'Err';
  }
}

function cleanAll() {
  // console.log(firstNumber, operator, number, result, 'first console');
  counter = 0;

  firstNumber = '';
  operator = '';
  number = '';
  result = '';
  currentResult.innerText = '0';
  currentResult.style.fontSize = 64 + 'px';
  // console.log(firstNumber, operator, number, result + 'second console');
}

function delLastSymbol(e) {
  addNumber(e);
   // console.log(number + 'before del');
  number = number.substring(0, number.length - 1);
  currentResult.innerText = number;
  checkNumberLength();
  // console.log(number);
  // console.log(number + 'after del');
  if(number === '') {
    currentResult.innerText = 0;
  }
}


function findSqrt() {
  if(firstNumber !== '') {
    currentResult.innerText = "Err";
    return false;
  }

  if(result !== '') {
    number = result;
  }

  let num = Math.sqrt(parseInt(number,10));
  number = num.toString();
  console.log(number.length, typeof num);
  result = number.length > 18 ? parseFloat(num).toFixed(15) : number;

  // console.log(result);
  currentResult.innerText = result;
  checkNumberLength();
  number = '';
  //result = '';
}

function evaluateHist(e) {
  let value = e.target.dataset.value;

  if(value === '.' && counter > 0) {
    evalDiv.innerText += '';
    return false;
  } else if(!number && value === '.' && counter === 0) {
    evalDiv.innerText = '0';
  }

  if(value === '«') {
    let val = evalDiv.innerText;
    val = val.substring(0, val.length - 1);
    evalDiv.innerText = '';
    evalDiv.innerText = val;
    return false;
  }

  if(value === 'CE') {
    evalDiv.innerText = firstNumber + operator;
    return false;
  }

  if(result !== '') {
    evalDiv.innerText = result;
    evalDiv.innerText += value;
  } else {
    evalDiv.innerText += value;

  }


  if(value === '=' || value === 'C' || value === '√') {
    evalDiv.innerText = '';
  }






}


// eventListener for adding numbers
numbers.forEach(number => number.addEventListener('click', addNumber));
// eventListener for adding operators
operators.forEach(operator => operator.addEventListener('click', addOperator));

// eventListener for deleting last number
clearLastNumber.addEventListener('click', clearLNumb);
// eventListener for clearing all data
clearAll.addEventListener('click', cleanAll);
// eventListener for deleting last character
deleteLastSymbol.addEventListener('click', delLastSymbol);
// eventListener for Math.sqrt()
sqrt.addEventListener('click', findSqrt);
// eventListener for agging data to history
standardButtons.forEach(standardButton => standardButton.addEventListener('click', evaluateHist));
point.addEventListener('click', function () {
  counter++;
  console.log(counter);

});
// evaluating data
equal.addEventListener('click', evaluate);






