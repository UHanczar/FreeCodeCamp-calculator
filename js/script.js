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
// counter for '.'
let counter = 0;




// function checks number length to be less than 18 characters  and changes font-size according to number's length
function checkNumberLength() {

  if(number.length >= 8 && number.length < 10 || result.length >= 8 && result.length < 10) {
      currentResult.style.fontSize = 54 + 'px';
  } else if(number.length >= 10 && number.length <= 12 || result.length >= 10 && result.length <= 12) {
      currentResult.style.fontSize = 44 + 'px';
    } else if(number.length >= 13 &&  number.length <= 19  || result.length >= 13 && result.length <= 19) {
      currentResult.style.fontSize = 27 + 'px';
    } else if(number.length > 19 || result.length > 19) {
      result = 'Err';
      currentResult.innerText = result;
      currentResult.style.fontSize = 64 + 'px';

    } else if(number.length < 8 &&  number.length >= 0 || result.length <  8 && result.length >= 0) {
     currentResult.style.fontSize = 64 + 'px';
  }
}


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
  if(!number.length && val === '.') {
    //return false;
    number = '0';
  }
  
  // for evalDiv data
  if(val === '.' && result.length) {
    firstNumber = '';
    result = '';
    //counter = 1;
  }

  // prevents adding '.'
  if(val === '.' && counter > 0) {
    number = '0.';
    currentResult.innerText = number;
    return false;
  }

  // if(!number.length && val === '.') {
  //   return false;
  // }

  // adding character to number
  if(e.target.classList.contains('number')) {
    val = e.target.dataset.value;
    number += val;
    console.log(number);
    checkNumberLength();
    currentResult.innerText = number;

  } else {
    return false;
  }

  console.log(operator);

}

function addOperator(e) {
  let val = e.target.dataset.value;

  // for '.' checking
  counter = 0;


  // if(val === operator) {
  //   operator = val;
  //   // return false;
  // }
  //
  // if(number === '0') {
  //   number = '0';
  // }

  // for adding with operators
  if(number !== '' && firstNumber !== '' && operator !== '') {
    evaluate();
    firstNumber = result;
    // result = 0;
  }


  // for adding with operators
  if(result !== '') {
    firstNumber = result;
    // result = '';
    number = '';
    operator = val;
  } else if(number.length) { // adding if !firstnumber
    operator = val;
    firstNumber = number;
    number = '';
  } else if(!number.length) {
    operator = val;
  }

  // checking '.' symbol
  let lastSymbolLength = firstNumber.length - 1;
  let lastChar = firstNumber[lastSymbolLength];
  if(lastChar === '.') {
    firstNumber = firstNumber.substring(0, firstNumber.length-1);
    currentResult.innerText = firstNumber;
  }
  // console.log(lastChar);
  // console.log('fNum:' + firstNumber, 'num:' + number, 'op:' + operator);
}

function evaluate() {

  //counter = 0;
  // console.log(number);

  // preventing evaluating with not complite stack of numbers or operator
  if(operator === '' && number !== '' || operator === '') {
    number = '0';
    currentResult.innerText = number;
    console.log('number: ' + number);
  }

  // preventing evaluating with not complite stack of numbers or operator
  if(number.length && operator === '') {
    firstNumber = '';
    number = '0';
    currentResult.innerText = number;
    return false;
  } else // prevents evaluating just clicking '='
  if(firstNumber === '' || number === '') {
    number = '0';
    currentResult.innerText = number;
    //return false;
  }

  // throws error if there is some mess
  if(result === 'undefined' || result == isNaN(NaN) ) {
    currentResult.innerText = 'Err';
  }

  // process of evaluation
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

  // if(result.includes('.')) {
  //     counter = 1;
  //     console.log('hello');
  //
  // }


  // checks number length
  if(result.length > 19) {
    result = 'Err';
    currentResult.innerText = result;
    currentResult.style.fontSize = 64 + 'px';
  }

  checkNumberLength();
  currentResult.innerText = result;
  operator = '';
  firstNumber = '';
  number = '';
  //result = '';

}

function clearLNumb() {
  // console.log(number + 'first console');
  counter = 0;
  number = '0';
  // if we decided to del operator
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
  number = '0';
  result = '';
  currentResult.innerText = '0';
  currentResult.style.fontSize = 64 + 'px';
  // console.log(firstNumber, operator, number, result + 'second console');
}

function delLastSymbol(e) {
  // adding symbol to number
  addNumber(e);
   // console.log(number + 'before del');
  // cutting last symbol
  number = number.substring(0, number.length - 1);
  currentResult.innerText = number;
  checkNumberLength();
  // console.log(number);
  // console.log(number + 'after del');
  // if number.length === 0, number = 0
  if(!number.includes('.')) {
    counter = 0;
  }

  // when result, deletes it and makes value = 0
  if(currentResult.innerText === result) {
    number = '0';
    firstNumber = '';
    currentResult.innerText = number;
  }


  // if(result.length && currentResult.innerText === result) {
  //   currentResult.innerText = '0';
  //   number = '0';
  //   firstNumber = '0';
  //
  // }
}


function findSqrt() {
  // prevents sqrt from 0
  // if(firstNumber !== '' || !number.length) {
  //   currentResult.innerText = "Err";
  //   return false;
  // }

  console.log(number);

  // if you want make sqrt from result
  if(result !== '' && !number.length) {
    number = result;
  }

  // making sqrt from number
  let num = Math.sqrt(parseInt(number,10));
  number = num.toString();
  // console.log(number.length, typeof num);
  result = number.length > 18 ? parseFloat(num).toFixed(15) : number;

  // console.log(result);
  currentResult.innerText = result;
  checkNumberLength();
  number = '';
  //result = '';
}

function evaluateHist(e) {
  let value = e.target.dataset.value;

  // if(value === operator) {
  //   return false;
  // }

  // if(value === operator) {
  //   evalDiv.innerText += '';
  // }

  // if(value === '.' && counter === 0 && number === '0.') {
  //   console.log(number);
  //   evalDiv.innerText = '0' + value;
  // }

  // preventing adding '.' if forbidden
  let lastSymbolLength = evalDiv.innerText.length - 1;
  let lastChar = evalDiv.innerText[lastSymbolLength];
  if(lastChar === '.') {
    evalDiv.innerText += '';
    //return false;
  }


  //
  // if(value === '.' && !firstNumber.length && number === '0.' && counter === 0) {
  //   console.log(number);
  //   evalDiv.innerText += '';
  // }

  // else if(firstNumber.length && number === '0.' && value === '.' && counter === 0) {
  //   console.log(number);
  //   evalDiv.innerText += '0';
  // }

  // prevents return '.' when forbidden
  if(value === '.' && counter > 0) {
    evalDiv.innerText = number;
    return false;
  }

  // gerulates return '.'
  if(value === '.' && number === '0.' && result.length && firstNumber.length) {
    evalDiv.innerText = '';
  } else if(value === '.' && number === '0.' && !firstNumber.length) {
    evalDiv.innerText = number.substring(0, number.length - 1);
  } else if(value === '.' && number === '0.' && firstNumber.length) {
      evalDiv.innerText = firstNumber + operator + number.substring(0, number.length - 1);
  }



  // if(value === '.' && !number.length) {
  //   evalDiv.innerText = firstNumber + operator + '0';
  // }



  // if delete symbol uses
  if(value === '«') {
    let val = evalDiv.innerText;
    val = val.substring(0, val.length - 1);
    evalDiv.innerText = '';
    evalDiv.innerText = val;
    return false;
  }

  // if 'CE' symbol eses
  if(value === 'CE' && operator !== '') {
    evalDiv.innerText = firstNumber + operator;
    return false;
  }

  // regulates adding symbols when other conditions allow
  if(result !== '') {
    // evalDiv.innerText = result;
    evalDiv.innerText = number;
  } else {
    evalDiv.innerText += value;

  }

  // regulates adding operator
  if(value === operator) {
    evalDiv.innerText = result.length ? result + value : firstNumber + value;
  }



  // regulates steps, when special symbols use
  if(value === '=' && firstNumber !== '' || value === 'C' || value === '√' || value === 'CE' && firstNumber === '') {
    evalDiv.innerText = '';
    return false;

  }

  // regulates steps, when special symbols use
  if(firstNumber === '' && value === '=' || number === '' && value === '=') {
    evalDiv.innerText = '';

  }

  // if(value === '=' && !result.length) {
  //   evalDiv.innerText += '';
  //
  // }
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






