'use strict';

const labelDays = document.querySelector('.timer__days');
const labelHours = document.querySelector('.timer__hours');
const labelMinutes = document.querySelector('.timer__minutes');
const labelSeconds = document.querySelector('.timer__seconds');

const arr = [labelDays, labelHours, labelMinutes, labelSeconds];

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
  const timerCount = setInterval(() => {
    time -= 1000;
    showCountdown();

    if (time === 0) {
      clearInterval(timerCount);
      console.log('Timer Done!');
    }
    //   console.log(time);
  }, 1000);
}

// MODAL SETUP
const btnCloseModal = document.querySelector('.btn--close');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const closeModal = () => {
  modal.classList.add('disabled');
  overlay.classList.add('disabled');
};

btnCloseModal.addEventListener('click', closeModal);

// DATE PICKER USING DATE INPUT FIELD
const tomorrowInMilli = Number(new Date()) + 24 * 60 * 60 * 1000;
const tomorrow = new Date(tomorrowInMilli).toISOString();
console.log(tomorrow.slice(0, tomorrow.indexOf('T')));

const datePicker = document.querySelector('input[type="date"]');
datePicker.setAttribute('min', tomorrow.slice(0, tomorrow.indexOf('T')));

modal.addEventListener('click', e => {
  // if (e.target.classList.contains('btn--user-input')) {
  // }

  if (e.target.classList.contains('btn--date-input')) {
    const dateNum =
      Number(new Date(datePicker.value)) ||
      Number(new Date(datePicker.getAttribute('min')));

    time = dateNum - new Date();
    closeModal();
    showCountdown();
    beginCountdown();
  }

  if (e.target.classList.contains('btn--generic-input')) {
    time = 2592000000;
    closeModal();
    showCountdown();
    beginCountdown();
  }
});
