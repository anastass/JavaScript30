// const video = document.querySelector('video');
// // video.play();

// const player__buttons = document.querySelectorAll('.player__button');
// player__buttons.forEach(button => button.addEventListener('click', playerAction));

// function playerAction(e) {
//     if (this.dataset.skip) {
//         console.log(`Skip ${this.dataset.skip}...`);
//     } else {
//         console.log('Play...');
//     }
// }

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll("input[type='range']");
const toggle_fullscreen = player.querySelector(".fullscreen");

function togglePlay() {
  // if (video.paused) {
  //     video.play();
  // } else {
  //     video.pause();
  // }

  // const method = video.paused ? 'play': 'pause';
  // video[method]();
  video[video.paused ? "play" : "pause"]();
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
  // if (video.paused) {
  //     console.log('paused');
  // } else {
  //     console.log('playing...');
  // }
}

function skip() {
  // console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(e) {
  // console.log(this.value);
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
}

let mousedown = false;

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton); // update play button when video is playing
video.addEventListener("pause", updateButton); // update play button when video is paused
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
document.body.onkeyup = function(e) {
  // listen for space
  if (e.keyCode == 32) {
    togglePlay();
  }
};

skipButtons.forEach(button => button.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
window.innerHeight;
ranges.forEach(range =>
  range.addEventListener("mousemove", e => mousedown && handleRangeUpdate(e))
);
ranges.forEach(range =>
  range.addEventListener("mousedown", () => (mousedown = true))
);
ranges.forEach(range =>
  range.addEventListener("mouseup", () => (mousedown = false))
);

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

function toggleFullScreen() {
  if (!document.webkitIsFullScreen) {
    player.webkitRequestFullScreen();
  } else {
    document.webkitExitFullscreen();
  }
}

toggle_fullscreen.addEventListener("click", toggleFullScreen);
