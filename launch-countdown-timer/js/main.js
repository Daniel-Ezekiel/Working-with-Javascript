'use strict';

const labelDays = document.querySelector('.timer__days');
const labelHours = document.querySelector('.timer__hours');
const labelMinutes = document.querySelector('.timer__minutes');
const labelSeconds = document.querySelector('.timer__seconds');

const arr = [labelDays, labelHours, labelMinutes, labelSeconds];

let time = 150000;

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
  const days = calcDays();
  const hours = calcHours();
  const minutes = calcMinutes();
  const seconds = calcSeconds();

  labelDays.textContent = days;
  labelHours.textContent = hours;
  labelMinutes.textContent = minutes;
  labelSeconds.textContent = seconds;
  //   console.log(days, hours, minutes, seconds);
}

const timerCount = setInterval(() => {
  time -= 1000;
  showCountdown();

  if (time === 0) {
    clearInterval(timerCount);
    console.log('Timer Done!');
  }
  //   console.log(time);
}, 1000);
