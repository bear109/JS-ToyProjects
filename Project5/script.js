const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Button function
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function showMillion() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

function sort() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function calculate() {
  const total = data.reduce((acc, user) => (acc += user.money), 0);
  const totalEl = document.createElement('div');
  totalEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
  main.appendChild(totalEl);
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

function formatMoney(number) {
  return '$' + number.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function updateDOM(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  providedData.forEach((item) => {
    const person = document.createElement('div');
    person.classList.add('person');
    person.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(person);
  });
}

//Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionBtn.addEventListener('click', showMillion);
sortBtn.addEventListener('click', sort);
calculateBtn.addEventListener('click', calculate);
