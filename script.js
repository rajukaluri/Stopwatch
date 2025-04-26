// script.js

let timer;
let isRunning = false;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const minuteDisplay = document.getElementById('minutes');
const secondDisplay = document.getElementById('seconds');
const millisecondDisplay = document.getElementById('milliseconds');
const lapList = document.getElementById('lapList');

function startStopwatch() {
    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
    } else {
        timer = setInterval(updateTime, 10);
        startStopButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function updateTime() {
    milliseconds++;
    if (milliseconds >= 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    
    minuteDisplay.textContent = formatTime(minutes);
    secondDisplay.textContent = formatTime(seconds);
    millisecondDisplay.textContent = formatTime(milliseconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    minuteDisplay.textContent = '00';
    secondDisplay.textContent = '00';
    millisecondDisplay.textContent = '00';
    startStopButton.textContent = 'Start';
    lapList.innerHTML = '';
}

function addLap() {
    if (isRunning) {
        const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

// Event listeners for buttons
startStopButton.addEventListener('click', startStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', addLap);
