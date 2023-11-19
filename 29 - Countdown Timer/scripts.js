function addLeadingZeros(number) {
  return String(number).padStart(2, "0");
}

function isNumeric(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function resetTimer(timerId) {
  clearTimeout(timerId);
  updateTimerText(0);
}

function getFinishDate(initialValue) {
  let finish = new Date();
  finish = new Date(finish.getTime() + initialValue * 1000);
  const [finishHours, finishMinutes] = [finish.getHours(), finish.getMinutes()];
  return [addLeadingZeros(finishHours), addLeadingZeros(finishMinutes)];
}

function formatSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  return [addLeadingZeros(minutes), addLeadingZeros(seconds)];
}

function updateTimerText(secondsLeft) {
  const timeLeft = document.querySelector(".display__time-left");
  const [minutes, seconds] = formatSeconds(secondsLeft);
  const timerText = `${minutes}:${seconds}`;
  timeLeft.innerText = timerText;
  document.title =
    minutes == "00" && seconds == "00" ? "Countdown Timer" : timerText;
}

function startTimer(totalSeconds) {
  updateTimerText(totalSeconds);
  const [finishHours, finishMinutes] = getFinishDate(totalSeconds);
  setFinishTime(finishHours, finishMinutes);

  let secondsLeft = totalSeconds;
  timerId = setTimeout(function updateTimer() {
    if (secondsLeft <= 0) return;
    if (secondsLeft < 1) {
      resetTimer(timerId);
      return;
    }
    secondsLeft--;
    updateTimerText(secondsLeft);
    timerId = setTimeout(updateTimer, 1000);
  }, 1000);
}

function handleFormSubmit(e) {
  e.preventDefault();
  if (timerId) resetTimer(timerId);
  const minutes = this.minutes.value;
  this.reset();
  if (!isNumeric(minutes)) return;
  const totalSeconds = minutes * 60;
  startTimer(totalSeconds);
}

function handleTimerButtonClick(e) {
  if (timerId) clearTimeout(timerId);
  const totalSeconds = e.currentTarget.dataset.time;
  startTimer(totalSeconds);
}

function setFinishTime(finishHours, finishMinutes) {
  const endTime = document.querySelector(".display__end-time");
  endTime.innerText = `Be Back At ${finishHours}:${finishMinutes}`;
}

let timerId;

const timerButtons = document.querySelectorAll("[data-time]");
const form = document.customForm;

timerButtons.forEach((button) =>
  button.addEventListener("click", handleTimerButtonClick)
);
form.addEventListener("submit", handleFormSubmit);
