"use strict";

function thereminOn(oscillator) {
    oscillator.play();
}

function thereminControl(e, oscillator, theremin) {
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(x, y);

    let minFrequency = 220.0;
    let maxFrequency = 880.0;
    let freqRange = maxFrequency - minFrequency;
    let thereminFreq = minFrequency + (x / theremin.clientWidth) * freqRange;
    let thereminVolume = 1.0 - (y / theremin.clientHeight);

    console.log("Frequency: ", thereminFreq);
    oscillator.frequency = thereminFreq;
    console.log("Volume: ", thereminVolume);
    oscillator.volume = thereminVolume;
}

function thereminOff(oscillator) {
    oscillator.stop();
}

function runAfterLoadingPage() {
    const oscillator = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: "sine",
            frequency: 220
        }
    });

    const theremin = document.getElementById("thereminZone");

    theremin.addEventListener("mouseenter", function (e) {
        thereminOn(oscillator);
    });
    theremin.addEventListener("mousemove", function (e) {
        thereminControl(e, oscillator, theremin);
    });
    theremin.addEventListener("mouseleave", function () {
        thereminOff(oscillator);
    });
}

window.onload = runAfterLoadingPage;
