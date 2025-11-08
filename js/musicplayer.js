const audioPlayer = document.getElementById('audioPlayer');
const currentTrackEl = document.getElementById('currentTrack');
const seekBar = document.getElementById('seekBar');
const playPauseBtn = document.getElementById('playPauseBtn');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const hamburger = document.getElementById('hamburger');
const musicMenu = document.getElementById('musicMenu');
const playPauseIcon = document.getElementById('playPauseIcon');
const musicPlayer = document.getElementById('musicPlayer');
const overlay = document.getElementById('overlay');


let isDragging = false;
let offsetX = 0;
let offsetY = 0;

musicPlayer.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - musicPlayer.offsetLeft;
    offsetY = e.clientY - musicPlayer.offsetTop;
    musicPlayer.style.transition = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        musicPlayer.style.left = `${e.clientX - offsetX}px`;
        musicPlayer.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        musicPlayer.style.transition = ''; 
    }
});

overlay.onclick = () => {
    musicMenu.classList.remove('active');
    overlay.classList.remove('active');
};


function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function playTrack(file) {
    audioPlayer.src = file;
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseIcon.src = "data/img/pause.png"; 
    }
    currentTrackEl.textContent = file.split('/').pop();
}

// Cập nhật seek bar và thời gian
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
        durationEl.textContent = formatTime(audioPlayer.duration);
    }
});

// Khi tua nhạc
seekBar.addEventListener('input', (e) => {
    if (audioPlayer.duration) {
        audioPlayer.currentTime = (e.target.value / 100) * audioPlayer.duration;
    }
});

// Nút tạm dừng / phát
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseIcon.src = "data/img/pause.png"; 
    } else {
        audioPlayer.pause();
        playPauseIcon.src = "data/img/continue.png"; 
    }
});

// Tạo danh sách nhạc
const musicList = document.getElementById('musicList');
const musicFiles = [
    'data/music/Chill.mp3',
    'data/music/Chillout.mp3',
    'data/music/Floating.mp3',
    'data/music/Tropical-Soul.mp3',
    'data/music/Magic.mp3',
    'data/music/Sonder.mp3',
    'data/music/Transcendence.mp3',
];

hamburger.addEventListener('click', () => {
    musicMenu.classList.toggle('active'); 
    overlay.classList.toggle('active');
});

function setActive(btn) {
  document.querySelectorAll('.top-bar button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

musicFiles.forEach(file => {
    const li = document.createElement('li');
    li.textContent = file.split('/').pop();
    li.style.cursor = 'pointer';
    li.style.padding = '5px';
    li.style.listStyle = 'none';
    li.addEventListener('click', () => {
        playTrack(file);
    });
    musicList.appendChild(li);
});

let currentTrackIndex = 0;

function playCurrentTrack() {
    const file = musicFiles[currentTrackIndex];
    playTrack(file);
}

function goNext() {
    currentTrackIndex = (currentTrackIndex + 1) % musicFiles.length;
    playCurrentTrack();
}

function goBack() {
    currentTrackIndex = (currentTrackIndex - 1 + musicFiles.length) % musicFiles.length;
    playCurrentTrack();
}

audioPlayer.addEventListener('ended', goNext);


window.addEventListener('click', () => {
    if (audioPlayer.paused) {
        playCurrentTrack();
    }
}, { once: true }); 

