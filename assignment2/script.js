const video = document.querySelector("#custom-video-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
video.removeAttribute("controls");
// playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("timeupdate", updateProgressBar);
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}
function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
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

function showHome() {
  resetHeader();
  header.classList.add("fullpage-header");
  pageContent.innerHTML = `
    <section>
      <h2>Welcome</h2>
      <p>Click "Music" to enjoy calming sounds, or "Timer" to focus your session!</p>
    </section>
  `;
}

function showMusic() {
  resetHeader();
  pageContent.innerHTML = `
    <div class="media-player">
      <video id="custom-video-player" controls>
        <source src="https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/miac.mp4" type="video/mp4" />
      </video>
      <div class="custom-controls">
        <button id="play-pause-btn" onclick="togglePlayPause()">
          <img id="play-pause-img" src="https://img.icons8.com/ios-glyphs/30/play--v1.png" alt="Play Button" width="24" height="24" />
        </button>
        <div class="progress-bar">
          <span id="progress-bar-fill"></span>
        </div>
      </div>
    </div>
    <section>
      <h2>Additional Content</h2>
      <p>This is where you can showcase any other relevant content.</p>
    </section>
  `;

  // Reconnect the player!
  reconnectVideoPlayer();
}

function showTimer() {
  resetHeader();
  pageContent.innerHTML = `
    <section>
      <h2>Set a Study Timer</h2>
      <div>
        <button onclick="startTimer(5)">5 min</button>
        <button onclick="startTimer(10)">10 min</button>
        <button onclick="startTimer(15)">15 min</button>
        <button onclick="startTimer(20)">20 min</button>
      </div>
      <div id="timer-display" style="font-size: 2em; margin-top: 20px;">00:00</div>
    </section>
  `;
}

let timerInterval;
function startTimer(minutes) {
  clearInterval(timerInterval);
  let seconds = minutes * 60;

  function updateDisplay() {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    document.getElementById("timer-display").textContent = `${min}:${sec}`;
    if (seconds > 0) {
      seconds--;
    } else {
      clearInterval(timerInterval);
      alert("Time is up!");
    }
  }

  updateDisplay();
  timerInterval = setInterval(updateDisplay, 1000);
}

// Needed because after switching to "Music" we need to rebind video controls
function reconnectVideoPlayer() {
  const video = document.querySelector("#custom-video-player");
  const playPauseBtn = document.querySelector("#play-pause-btn");
  const playPauseImg = document.querySelector("#play-pause-img");
  const progressBar = document.querySelector("#progress-bar-fill");

  if (video) {
    video.removeAttribute("controls");
    video.addEventListener("timeupdate", updateProgressBar);
  }

  function updateProgressBar() {
    const value = (video.currentTime / video.duration) * 100;
    progressBar.style.width = value + "%";
  }

  window.togglePlayPause = function () {
    if (video.paused || video.ended) {
      video.play();
      playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
    } else {
      video.pause();
      playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
    }
  };
}
