const soat = document.querySelector('.soat');
const timer = document.querySelector('.timer');
const btnSoat = document.querySelector('.btn-soat');
const btnTimer = document.querySelector('.btn-timer');
const seconds = document.querySelector('.seconds');
const minutes = document.querySelector('.minutes');
const hours = document.querySelector('.hours');
const swMain = document.querySelector('.btn-sw-main');
const swReset = document.querySelector('.btn-sw-reset');
const swHours = document.querySelector('.sw-hours');
const swMinutes = document.querySelector('.sw-minutes');
const swSeconds = document.querySelector('.sw-seconds');
const swMs = document.querySelector('.sw-ms');

function switchMode(isClock) {
    soat.classList.toggle('active', isClock);
    btnSoat.classList.toggle('active', isClock);

    timer.classList.toggle('active', !isClock);
    btnTimer.classList.toggle('active', !isClock);
}

btnSoat.addEventListener('click', () => switchMode(true));
btnTimer.addEventListener('click', () => switchMode(false));



function clock() {
    let time = new Date();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let hour = time.getHours();

    minutes.innerHTML = min < 10 ? '0' + min : min;
    hours.innerHTML = hour < 10 ? '0' + hour : hour;
    seconds.innerHTML = sec < 10 ? '0' + sec : sec;


    setTimeout(function () {
        clock();
    }, 1000)
}

clock()


let startTime = 0;
let elapsed = 0; 
let interval = null;

function updateDisplay(time) {
    let ms = Math.floor((time % 1000) / 10);
    let sec = Math.floor((time / 1000) % 60);
    let min = Math.floor((time / 60000) % 60);
    let hour = Math.floor(time / 3600000);

    swMs.innerHTML = ms < 10 ? '0' + ms : ms;
    swSeconds.innerHTML = sec < 10 ? '0' + sec : sec;
    swMinutes.innerHTML = min < 10 ? '0' + min : min;
    swHours.innerHTML = hour < 10 ? '0' + hour : hour;

    if (time === 0) {
        swReset.classList.remove('active');
    }
}

swMain.addEventListener('click', () => {
    swMain.classList.toggle('active');

    if (swMain.classList.contains('active')) {
        swMain.innerHTML = 'Stop';

        startTime = Date.now() - elapsed;

        interval = setInterval(() => {
            elapsed = Date.now() - startTime;
            updateDisplay(elapsed);
        }, 10);

        swReset.classList.add('active');

    } else {
        swMain.innerHTML = 'Start';
        clearInterval(interval);
    }
});

swReset.addEventListener('click', () => {
    clearInterval(interval);

    startTime = 0;
    elapsed = 0;

    updateDisplay(0);

    swMain.classList.remove('active');
    swMain.innerHTML = 'Start';

    swReset.classList.remove('active');
});