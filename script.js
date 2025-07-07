const fileInput = document.getElementById('fileInput');
const speedControl = document.getElementById('speedControl');
const speedLabel = document.getElementById('speedLabel');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const seekBar = document.getElementById('seekBar');
const saveButton = document.getElementById('saveButton');
const formatSelect = document.getElementById('formatSelect');

const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const messageClose = document.getElementById('messageClose');

function showMessage(text) {
  messageText.textContent = text;
  messageBox.classList.remove('hidden');
}

function hideMessage() {
  messageBox.classList.add('hidden');
}

messageClose.addEventListener('click', () => {
  hideMessage();
});

let audio = new Audio();
let currentURL = null;
let isPlaying = false;

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (currentURL) URL.revokeObjectURL(currentURL);
  currentURL = URL.createObjectURL(file);
  audio.src = currentURL;
  audio.load();
  seekBar.value = 0;
  isPlaying = false;
});

speedControl.addEventListener('input', () => {
  const speed = parseFloat(speedControl.value);
  speedLabel.textContent = speed.toFixed(1) + 'x';
  audio.playbackRate = speed;
});

playBtn.addEventListener('click', () => {
  if (audio.src) {
    audio.play();
    isPlaying = true;
  } else {
    showMessage("You didn't select any audio!");
  }
});

pauseBtn.addEventListener('click', () => {
  if (audio.src) {
    audio.pause();
    isPlaying = false;
  } else {
    showMessage("You didn't select any audio!");
  }
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    seekBar.value = (audio.currentTime / audio.duration) * 100;
  }
});

seekBar.addEventListener('input', () => {
  if (audio.duration) {
    audio.currentTime = (seekBar.value / 100) * audio.duration;
  }
});

saveButton.addEventListener('click', () => {
  if (!audio.src) {
    showMessage("You didn't select any audio!");
    return;
  }

  const format = formatSelect.value;
  showMessage(`Saving as ${format.toUpperCase()} is not implemented yet. To export audio, we need ffmpeg.wasm or a backend.`);
});
