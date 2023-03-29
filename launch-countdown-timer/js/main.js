'use strict';

// LABEL ELEMENTS
const labelDays = document.querySelector('.timer__days');
const labelHours = document.querySelector('.timer__hours');
const labelMinutes = document.querySelector('.timer__minutes');
const labelSeconds = document.querySelector('.timer__seconds');
// MODAL ELEMENTS
const btnCloseModal = document.querySelector('.btn--close');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
// all input fields for collecting user values
const daysInput = document.querySelector('#days');
const hoursInput = document.querySelector('#hours');
const minutesInput = document.querySelector('#minutes');
const secondsInput = document.querySelector('#seconds');

let time;
const calcDays = _ => {
  return Math.floor(time / (1000 * 60 * 60 * 24));
};
const calcHours = _ => {
  const rem = time % (1000 * 60 * 60 * 24);
  return Math.floor(rem / (1000 * 60 * 60));
};
const calcMinutes = _ => {
  const rem = time % (1000 * 60 * 60);
  return Math.floor(rem / (1000 * 60));
};
const calcSeconds = _ => {
  const rem = time % (1000 * 60);
  return Math.floor(rem / 1000);
};

function showCountdown() {
  labelDays.textContent = calcDays();
  labelHours.textContent = calcHours();
  labelMinutes.textContent = calcMinutes();
  labelSeconds.textContent = calcSeconds();
}
function beginCountdown() {
  if (time <= 0) return;

  const timerCount = setInterval(() => {
    if (time === 0) {
      clearInterval(timerCount);
      console.log('Timer Done!');
    }

    time -= 1000;
    showCountdown();
    //   console.log(time);
  }, 1000);
}

// MODAL SETUP
const closeModal = () => {
  modal.classList.add('disabled');
  overlay.classList.add('disabled');
};
btnCloseModal.addEventListener('click', closeModal);

// DATE PICKER USING DATE INPUT FIELD
const tomorrowInMilli = Number(new Date()) + 24 * 60 * 60 * 1000;
const tomorrow = new Date(tomorrowInMilli).toISOString();

const datePicker = document.querySelector('input[type="date"]');
datePicker.setAttribute('min', tomorrow.slice(0, tomorrow.indexOf('T')));

// TIMER INITIALISATION SETUP
modal.addEventListener('click', e => {
  if (e.target.classList.contains('btn--user-input')) {
    const daysNum = Number(daysInput.value) * 24 * 60 * 60;
    const hoursNum = Number(hoursInput.value) * 60 * 60;
    const minutesNum = Number(minutesInput.value) * 60;
    const secondsNum = Number(secondsInput.value);

    time = (daysNum + hoursNum + minutesNum + secondsNum) * 1000;
    closeModal();
    showCountdown();
    beginCountdown();
  } else if (e.target.classList.contains('btn--date-input')) {
    const dateNum =
      Number(new Date(datePicker.value)) ||
      Number(new Date(datePicker.getAttribute('min')));

    time = dateNum - new Date();
    closeModal();
    showCountdown();
    beginCountdown();
  } else if (e.target.classList.contains('btn--generic-input')) {
    time = 2592000000;
    closeModal();
    showCountdown();
    beginCountdown();
  }
});
