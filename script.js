const contanier = document.getElementById('contanier');
const input_container = document.getElementById('input-container');
const form = document.getElementById('form');
const date_picker = document.getElementById('date-picker');

const contTimeForm = document.getElementById('contTimeForm');
const countdown_title = document.getElementById('countdown_title');
const countdown = document.getElementById('countdown');
const span = document.querySelectorAll('span');

const btnCountDown = document.getElementById('countdown-button');
const complete = document.getElementById('complete');
const complete_info = document.getElementById('complete-info');
const complete_button = document.getElementById('complete-button');

let coutDownTitle = '';
let coutDownDate = '';
let date = new Date();
let countDownActive;
let saveCountDown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const today = new Date().toISOString().split('T')[0];
date_picker.setAttribute('min', today);

function updateDom() {
  countDownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = date - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    input_container.hidden = true;

    if (distance < 0) {
      countdown.hidden = true;
      clearInterval(countDownActive);
      complete_info.textContent = `${coutDownTitle} finish on ${coutDownDate}`;
      complete.hidden = false;
    } else {
      countdown_title.textContent = `${coutDownTitle}`;
      span[0].textContent = `${days}`;
      span[1].textContent = `${hours}`;
      span[2].textContent = `${minutes}`;
      span[3].textContent = `${seconds}`;
      complete.hidden = true;
      countdown.hidden = false;
    }

  }, second);
}

function updateCountDown(e) {
  e.preventDefault();
  coutDownTitle = e.srcElement[0].value;
  coutDownDate = e.srcElement[1].value;
  saveCountDown = {
    title: coutDownTitle,
    dateSave: coutDownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(saveCountDown));
  console.log(saveCountDown);
  if (coutDownDate === '') {
    alert('please set on date...');
  } else {
    date = new Date(coutDownDate).getTime();
    updateDom();
  }
}

function reset() {
  input_container.hidden = false;
  complete.hidden = true;
  countdown.hidden = true;
  clearInterval(countDownActive);
  countdown_title = '';
  coutDownDate = '';
  localStorage.removeItem('countdown');
}

function saveAttribute() {
  if (localStorage.getItem('countdown')) {
    input_container.hidden = true;
    saveCountDown = JSON.parse(localStorage.getItem('countdown'));
    coutDownTitle = saveCountDown.title;
    coutDownDate = saveCountDown.dateSave;
    date = new Date(coutDownDate).getTime();
    updateDom();
  }
}


contTimeForm.addEventListener('submit', updateCountDown);
btnCountDown.addEventListener('click', reset);
complete_button.addEventListener('click', reset);
saveAttribute();