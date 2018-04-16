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
  if (e.type === "change" || (e.type === "mousemove" && range_drag)) {
    // console.log(this.value);
    video[this.name] = this.value;
  }
}

function handleProgress() {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  if (e.type === "click" || (e.type === "mousemove" && progress_drag)) {
    const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
    video.currentTime = scrubTime;
  }
}

let range_drag = false;
let progress_drag = false;

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
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));
ranges.forEach(range =>
  range.addEventListener("mousedown", () => {
    range_drag = true;
  })
);
ranges.forEach(range =>
  range.addEventListener("mouseup", () => {
    range_drag = false;
  })
);

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", scrub);
progress.addEventListener("mousedown", () => {
  progress_drag = true;
});
progress.addEventListener("mouseup", () => {
  progress_drag = false;
});
