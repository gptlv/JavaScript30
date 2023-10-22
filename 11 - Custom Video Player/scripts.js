const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const fullscreen = player.querySelector(".fullscreen");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

const togglePlay = () => {
  if (video.paused) {
    video.play();
    return;
  }
  video.pause();
};

const updateButton = () => {
  if (video.paused) {
    toggle.innerHTML = "►";
    return;
  }
  toggle.innerHTML = "❚ ❚";
};

const handleSkipButtonClick = (e) => {
  const seconds = Number(e.currentTarget.dataset.skip);
  video.currentTime += seconds;
};

const updateRange = (e) => {
  const propertyName = e.currentTarget.name;
  if (e.type === "dblclick") {
    e.currentTarget.value = 1;
    video[propertyName] = 1;
    return;
  }
  const rangeValue = e.currentTarget.value;
  video[propertyName] = rangeValue;
};

const updateProgressBarPercentage = (percent) => {
  progressBar.style.flexBasis = `${percent}%`;
};

const handleProgressChange = () => {
  const percent = (video.currentTime / video.duration) * 100;
  updateProgressBarPercentage(percent);
};

const updateProgress = (e) => {
  if (!e.buttons) return;
  const percent = (e.offsetX / e.currentTarget.clientWidth) * 100;
  updateProgressBarPercentage(percent);
  video.currentTime = (video.duration * percent) / 100;
};

const handleFullscreenClick = () => {
  if (document.fullscreenElement) document.exitFullscreen();
  player.requestFullscreen();
};

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgressChange);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) =>
  button.addEventListener("click", handleSkipButtonClick)
);

ranges.forEach((range) => {
  range.addEventListener("dblclick", updateRange);
  range.addEventListener("change", updateRange);
  range.addEventListener("mousemove", updateRange);
});

progress.addEventListener("mousemove", updateProgress);
progress.addEventListener("mousedown", updateProgress);

fullscreen.addEventListener("click", handleFullscreenClick);
