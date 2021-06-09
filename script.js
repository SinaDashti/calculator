const displayUp = document.getElementById('display-up');
const displayMid = document.getElementById('display-mid');
const displayDown = document.getElementById('display-down');
const numberButton = document.getElementById('number');

if (displayDown.innerText.length > 16) displayDown.style.fontSize = `30px`;
if (displayDown.innerText.length > 22) displayDown.style.fontSize = `28px`;

console.log(numberButton);
// numberButton.addEventListener('click', function (e) {
//     let num = Array.from(e);
//     console.log(num);
// })
// console.log(displayDown.innerText.length);