/* Get elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreenToggle = player.querySelector(".player__fullscreentoggle");
let mousedown = false;

/* Build out functions */
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
video[this.name] = this.value;
}

function handleProgress() {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percentage}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullscreen() {
  if (this.dataset.fullscreen === "true") {
    this.dataset.fullscreen = false;
  } else {
    this.dataset.fullscreen = true;
    if(video.requestFullScreen){
      video.requestFullScreen();
    } else if(video.webkitRequestFullScreen){
      video.webkitRequestFullScreen();
    } else if(video.mozRequestFullScreen){
      video.mozRequestFullScreen();
    }
  }

  
}

/* Hook up events */
// video
video.addEventListener("click", togglePlay);
video.addEventListener("play", () => toggle.textContent = '►');
video.addEventListener("pause", () => toggle.textContent = '❚ ❚');
video.addEventListener("timeupdate", handleProgress);

// Play/Pause toggle
toggle.addEventListener("click", togglePlay);

// Skip buttons
skipButtons.forEach(x=>x.addEventListener("click", skip));

// Ranges for volume and playback rate
ranges.forEach(x=>x.addEventListener("mouseup", handleRangeUpdate));

// Progress bar
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) =>  mousedown  && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);

// Fullscreen toggle
fullscreenToggle.addEventListener("click", toggleFullscreen);