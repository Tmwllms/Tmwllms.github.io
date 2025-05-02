let audio, playPauseBtn, playPauseImg, progressBar, loopBtn;

function togglePlayPause() {
  if (audio.paused || audio.ended) {
    audio.play();
    playPauseImg.src = "assets/icons/icons8-pause-30.png";
  } else {
    audio.pause();
    playPauseImg.src = "assets/icons/icons8-play-30.png"; // Local play icon
  }
}

function updateProgressBar() {
  const value = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = value + "%";
}

// Add other functionalities here
const pageContent = document.getElementById("page-content");
const header = document.getElementById("main-header");
const mainContent = document.getElementById("main-content");

document.getElementById("homeButton").addEventListener("click", showHome);
document.getElementById("musicButton").addEventListener("click", showMusic);
document.getElementById("timerButton").addEventListener("click", showTimer);

function resetHeader() {
  header.classList.remove("fullpage-header");
}

function hideAllSections() {
  document.getElementById("home-section").style.display = "none";
  document.getElementById("music-section").style.display = "none";
  document.getElementById("timer-section").style.display = "none";
}

function showHome() {
  resetHeader();
  header.classList.add("fullpage-header");
  hideAllSections();
  document.getElementById("home-section").style.display = "block";
}

function showMusic() {
  resetHeader();
  hideAllSections();
  document.getElementById("music-section").style.display = "block";
  reconnectAudioPlayer();
  document
    .getElementById("volume-control")
    .addEventListener("input", setVolume);
}

function showTimer() {
  resetHeader();
  hideAllSections();
  document.getElementById("timer-section").style.display = "flex";
  bindTimerControls();
}

let timerInterval;
let timerAudio = new Audio("https://www.soundjay.com/button/beep-07.wav");

let totalTime = 0;
let currentTime = 0;
let timerPaused = true;

function bindTimerControls() {
  const pauseBtn = document.getElementById("pause-resume");
  const pauseIcon = document.getElementById("pause-icon");
  const input = document.getElementById("custom-time-input");
  const resetBtn = document.getElementById("reset-btn");

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const timeParts = input.value.trim().split(":");

      if (
        timeParts.length === 2 &&
        !isNaN(timeParts[0]) &&
        !isNaN(timeParts[1])
      ) {
        const minutes = parseInt(timeParts[0], 10);
        const seconds = parseInt(timeParts[1], 10);

        if (minutes >= 0 && minutes <= 1440 && seconds >= 0 && seconds < 60) {
          const totalSeconds = minutes * 60 + seconds;
          startTimerFromSeconds(totalSeconds);
          input.value = "";
        } else {
          alert("Minutes should be 0–1440 and seconds 0–59.");
        }
      } else {
        alert("Please enter time in MM:SS format.");
      }
    }
  });

  function startTimerFromSeconds(seconds) {
    totalTime = seconds;
    currentTime = totalTime;
    timerPaused = true;
    updateTimerDisplay(currentTime);
    updateTimerCircle(currentTime);
    startTimerCountdown(); // Ready but paused
  }

  pauseBtn.addEventListener("click", toggleTimerPlayPause);
  resetBtn.addEventListener("click", () => {
    timerPaused = true;
    clearInterval(timerInterval);
    updateTimerDisplay(0);
    updateTimerCircle(0);
    pauseIcon.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  });

  document.getElementById("timer-volume").addEventListener("input", (e) => {
    timerAudio.volume = e.target.value;
  });
}

function startTimer(minutes) {
  totalTime = minutes * 60;
  currentTime = totalTime;
  timerPaused = true;
  updateTimerDisplay(currentTime);
  updateTimerCircle(currentTime);
  startTimerCountdown(); // Ready, but paused
}

function startTimerCountdown() {
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (!timerPaused && currentTime > 0) {
      currentTime--;
      updateTimerDisplay(currentTime);
      updateTimerCircle(currentTime);
    } else if (currentTime <= 0) {
      clearInterval(timerInterval);
      timerAudio.play(); // Play sound on complete
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");
  document.getElementById("timer-display").textContent = `${min}:${sec}`;
}

function updateTimerCircle(seconds) {
  const circle = document.getElementById("progress-ring");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  const offset = circumference * (1 - seconds / totalTime);
  circle.style.strokeDashoffset = offset;
}

// Needed because after switching to "Music" we need to rebind video controls
function reconnectAudioPlayer() {
  audio = document.querySelector("#custom-audio-player");
  playPauseBtn = document.querySelector("#play-pause-btn");
  playPauseImg = document.querySelector("#play-pause-img");
  progressBar = document.querySelector("#progress-bar-fill");
  document.querySelector(".progress-bar").addEventListener("click", scrub);
  loopBtn = document.querySelector("#loop-btn");

  if (audio) {
    audio.removeAttribute("controls");
    audio.addEventListener("timeupdate", updateProgressBar);
    playPauseBtn.addEventListener("click", togglePlayPause);
    loopBtn.addEventListener("click", toggleLoop);
  }
}

function toggleTimerPlayPause() {
  const input = document.getElementById("timer-display").textContent.trim();
  const regex = /^(\d{2}):([0-5]\d)$/;

  if (timerPaused) {
    if (regex.test(input)) {
      const [_, mins, secs] = input.match(regex);
      totalTime = parseInt(mins, 10) * 60 + parseInt(secs, 10);
      currentTime = totalTime;
      timerPaused = false;
      updateTimerDisplay(currentTime);
      updateTimerCircle(currentTime);
      startTimerCountdown();
      document.getElementById("pause-icon").src =
        "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
    } else {
      alert("Please enter time in 00:00 format (MM:SS).");
    }
  } else {
    timerPaused = true;
    clearInterval(timerInterval);
    document.getElementById("pause-icon").src =
      "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

function updateProgressBar() {
  const value = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = value + "%";
}

function toggleLoop() {
  audio.loop = !audio.loop;
  loopBtn.style.backgroundColor = audio.loop ? "#4c7273" : "transparent";
}

function scrub(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const percent = offsetX / rect.width;
  audio.currentTime = percent * audio.duration;
}

function setVolume(event) {
  audio.volume = event.target.value;
}

// Ensuring that home page loads on default //
document.addEventListener("DOMContentLoaded", () => {
  showHome(); // Load Home on page entry
});

const input = document.getElementById("custom-time-input");
const setBtn = document.getElementById("set-custom-time");

setBtn.addEventListener("click", () => {
  const timeParts = input.value.trim().split(":");
  if (
    timeParts.length === 2 &&
    /^\d{1,2}$/.test(timeParts[0]) &&
    /^\d{2}$/.test(timeParts[1])
  ) {
    const minutes = parseInt(timeParts[0], 10);
    const seconds = parseInt(timeParts[1], 10);

    if (minutes <= 99 && seconds < 60) {
      const totalSeconds = minutes * 60 + seconds;
      startTimerFromSeconds(totalSeconds);
      input.value = "";
    } else {
      alert("Time must be less than or equal to 99:59.");
    }
  } else {
    alert("Please enter a valid time in MM:SS format.");
  }
});

function startTimerFromSeconds(seconds) {
  totalTime = seconds;
  currentTime = totalTime;
  timerPaused = true;
  updateTimerDisplay(currentTime);
  updateTimerCircle(currentTime);
  startTimerCountdown(); // just in case you use this
}
