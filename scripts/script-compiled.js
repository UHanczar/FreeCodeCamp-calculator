'use strict';

// let inpData = document.querySelector('[data-calc]');
var buttonInput = document.querySelector('.button-input');

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
    var res = arr.join('');
    var _result = eval(res);
    console.log(_result);
    arr = [];
    return _result;
  }
}

//addEventListener('keyup', inpClick);

//addEventListener('keyup', result);

buttonInput.addEventListener('click', function (e) {
  console.log(e.target.dataset.value);
  console.log('clicked');
});

//# sourceMappingURL=script-compiled.js.map