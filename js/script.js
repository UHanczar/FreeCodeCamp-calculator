// let inpData = document.querySelector('[data-calc]');
const buttonInput = document.querySelector('.button-input');
const buttons = document.querySelectorAll('[data-value]');
const display = document.querySelector('.enter-field');
let str = '';
let res = 0;


let arr = [];
function inpClick(e) {
  // console.log(String.fromCharCode(e.which));
  console.log(e.key);
  if(e.keyCode !== 187) {
    arr.push(e.key);
    console.log(arr);
  }
  return arr;
}

function result(e) {
  if(e.keyCode === 187 && !e.shiftKey) {
    let res = arr.join('');
    let result = eval(res);
    console.log(result);
    arr = [];
    return result;
  }


}

//addEventListener('keyup', inpClick);

//addEventListener('keyup', result);

buttons.forEach(button => button.addEventListener('click', function (e) {
  let val = e.target.dataset.value;

  // console.count(val);
  if(val == '=') {
    res = eval(str);
    str = res;
    display.innerText = res;
    console.log(res);
    return res;
  }
  str += val;
  display.innerText = str;
  //console.log(str);
}));




