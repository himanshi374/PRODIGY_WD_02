let startTime;
let running = false;
let laps = [];

function startStop() {
    if (running) {
        clearInterval(timer);
        document.getElementById('startStop').innerHTML = 'Start';
        running = false;
    } else {
        startTime = Date.now() - laps.reduce((acc, lap) => acc + lap, 0);
        timer = setInterval(updateDisplay, 10);
        document.getElementById('startStop').innerHTML = 'Stop';
        running = true;
    }
}

function reset() {
    clearInterval(timer);
    document.getElementById('display').innerHTML = '00:00:00';
    document.getElementById('startStop').innerHTML = 'Start';
    laps = [];
    updateLaps();
    running = false;
}

function recordLap() {
    if (running) {
        const lapTime = Date.now() - startTime;
        laps.push(lapTime);
        updateLaps();
    }
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').innerHTML = formattedTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hundredths = Math.floor((milliseconds % 1000) / 10);
    return `${padTime(minutes)}:${padTime(seconds)}:${padTime(hundredths)}`;
}

function padTime(time) {
    return time.toString().padStart(2, '0');
}

function updateLaps() {
    const lapsList = document.getElementById('laps');
    lapsList.innerHTML = '';
    laps.forEach((lapTime, index) => {
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapItem);
    });
}
