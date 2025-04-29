let audio, playPauseBtn, playPauseImg, progressBar, loopBtn;

function togglePlayPause() {
  if (audio.paused || audio.ended) {
    audio.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    audio.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
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

function showHome() {
  resetHeader();
  header.classList.add("fullpage-header");
  pageContent.innerHTML = `
    <section>
      <h2>Welcome!</h2>
      <p>Click "Music" to enjoy calming sounds, or "Timer" to focus your study or meditation session!</p>
    </section>
  `;
}

function showMusic() {
  resetHeader();
  pageContent.innerHTML = `
  <div class="media-player">
  <div class="image-container">
    <img src="https://via.placeholder.com/600x300" alt="Music Cover" style="width: 100%; height: auto;">
  </div>
  <audio id="custom-audio-player">
    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <div class="custom-controls">
    <button id="play-pause-btn">
      <img id="play-pause-img" src="https://img.icons8.com/ios-glyphs/30/play--v1.png" alt="Play Button" width="24" height="24">
    </button>
    <button id="loop-btn">
      🔁
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

  reconnectAudioPlayer();
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
function reconnectAudioPlayer() {
  audio = document.querySelector("#custom-audio-player");
  playPauseBtn = document.querySelector("#play-pause-btn");
  playPauseImg = document.querySelector("#play-pause-img");
  progressBar = document.querySelector("#progress-bar-fill");
  loopBtn = document.querySelector("#loop-btn");

  if (audio) {
    audio.removeAttribute("controls");
    audio.addEventListener("timeupdate", updateProgressBar);
    playPauseBtn.addEventListener("click", togglePlayPause);
    loopBtn.addEventListener("click", toggleLoop);
  }
}

function togglePlayPause() {
  if (audio.paused || audio.ended) {
    audio.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    audio.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
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
