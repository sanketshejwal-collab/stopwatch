
let seconds = 0, minutes = 0, hours = 0;
let interval = null;
let laps = JSON.parse(localStorage.getItem('stopwatchLaps')) || [];

const display = document.querySelector('h1');
const lapList = document.getElementById('lapList');

// Load saved data when the page opens
window.onload = () => {
    seconds = parseInt(localStorage.getItem('stopwatchSec')) || 0;
    minutes = parseInt(localStorage.getItem('stopwatchMin')) || 0;
    hours = parseInt(localStorage.getItem('stopwatchHour')) || 0;
    updateDisplay();
    renderLaps();
};

function updateDisplay() {
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    display.innerText = `${h}:${m}:${s}`;
    
    // Save live counts locally
    localStorage.setItem('stopwatchSec', seconds);
    localStorage.setItem('stopwatchMin', minutes);
    localStorage.setItem('stopwatchHour', hours);
}

function stopWatch() {
    seconds++;
    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++;
        if (minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }
    }
    updateDisplay();
}

function toggleStartPause() {
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    } else {
        interval = setInterval(stopWatch, 1000);
    }
}

function recordLap() {
    if (hours === 0 && minutes === 0 && seconds === 0) return;
    const currentLapTime = display.innerText;
    laps.push(`Lap ${laps.length + 1}: ${currentLapTime}`);
    localStorage.setItem('stopwatchLaps', JSON.stringify(laps));
    renderLaps();
}

function renderLaps() {
    lapList.innerHTML = "";
    laps.forEach(lap => {
        const li = document.createElement('li');
        li.className = 'lap-item';
        li.innerText = lap;
        lapList.appendChild(li);
    });
}

function resetStopwatch() {
    clearInterval(interval);
    interval = null;
    seconds = 0; minutes = 0; hours = 0;
    laps = [];
    localStorage.clear();
    updateDisplay();
    renderLaps();
}

// Button Click Events
document.getElementById('startBtn').addEventListener('click', toggleStartPause);
document.getElementById('pauseBtn').addEventListener('click', () => { clearInterval(interval); interval = null; });
document.getElementById('lapBtn').addEventListener('click', recordLap);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);

// Smart Feature: Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); // Stop page from scrolling down
        toggleStartPause();
    } else if (e.key.toLowerCase() === 'l') {
        recordLap();
    } else if (e.key.toLowerCase() === 'r') {
        resetStopwatch();
    }
});
