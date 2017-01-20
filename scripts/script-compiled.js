'use strict';

// let inpData = document.querySelector('[data-calc]');
var buttonInput = document.querySelector('.button-input');
var buttons = document.querySelectorAll('[data-value]');
var display = document.querySelector('.enter-field');
var str = '';
var res = 0;

var arr = [];
function inpClick(e) {
  // console.log(String.fromCharCode(e.which));
  console.log(e.key);
  if (e.keyCode !== 187) {
    arr.push(e.key);
    console.log(arr);
  }
  return arr;
}

function result(e) {
  if (e.keyCode === 187 && !e.shiftKey) {
    var _res = arr.join('');
    var _result = eval(_res);
    console.log(_result);
    arr = [];
    return _result;
  }
}

//addEventListener('keyup', inpClick);

//addEventListener('keyup', result);

buttons.forEach(function (button) {
  return button.addEventListener('click', function (e) {
    var val = e.target.dataset.value;

    // console.count(val);
    if (val == '=') {
      res = eval(str);
      str = res;
      display.innerText = res;
      console.log(res);
      return res;
    }
    str += val;
    display.innerText = str;
    //console.log(str);
  });
});

//# sourceMappingURL=script-compiled.js.map