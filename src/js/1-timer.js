import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const btn = document.querySelector('button');
btn.disabled = true;

const picker = document.querySelector('#datetime-picker');

let userSelectedDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   console.log(selectedDates[0]);
    //   console.log(new Date());

      if (selectedDates[0] <= new Date()) {
          btn.disabled = true;
        
          iziToast.show({
              title: 'Error',
              message: 'Please choose a date in the future',
              position: 'topRight'
          });

      } else {
          btn.disabled = false;
          userSelectedDate = selectedDates[0];
      }
  },
};

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

function updateTimer() {
    const difference = userSelectedDate - (new Date());

    if (difference <= 0) {
        clearInterval(intervalID);
        // btn.disabled = false;
        picker.disabled = false;
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);

     daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');

};

let intervalID;

btn.addEventListener("click", () => {
    btn.disabled = true;
    picker.disabled = true;
    intervalID = setInterval(updateTimer, 1000);
})