// let inpData = document.querySelector('[data-calc]');
let buttonInput = document.querySelector('.button-input');

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

buttonInput.addEventListener('click', function (e) {
  console.log(e.target.dataset.value);
  console.log('clicked');
});



