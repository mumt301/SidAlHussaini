"use strict";

function thereminOn(oscillator) {
    oscillator.play();
}

function thereminControl(e, oscillator, theremin) {
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(x, y);

    let minFrequency = 110.0;
    let maxFrequency = 880.0;
    let freqRange = maxFrequency - minFrequency;
    let thereminFreq = minFrequency + (x / theremin.clientWidth) * freqRange;
    let thereminVolume = 1.0 - (y / theremin.clientHeight);

    console.log("Frequency: ", thereminFreq);
    oscillator.frequency = thereminFreq;
    oscillator2.frequency = thereminFreq * 2;
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
            frequency: 110
        }
    });

    const oscillator2 = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: "sine",
            frequency: 220
        }
    });

    const theremin = document.getElementById("thereminZone");

    theremin.addEventListener("mouseenter", function (e) {
        thereminOn(oscillator, oscillator2);
    });
    theremin.addEventListener("mousemove", function (e) {
        thereminControl(e, oscillator, oscillator2, theremin);
    });
    theremin.addEventListener("mouseleave", function () {
        thereminOff(oscillator, oscillator2);
    });
}





function interval(frequency, semitones) {
    return frequency * Math.pow(2, semitones / 12);
}

function midiToFrequency(midinumber, concertA = 440) {
    const A4 = 69
    if (midinumber === A4) {
        return concertA;
    }
    let semitones = midinumber - A4;
    return interval(440, semitones);
}

function midiFromFrequency(frequency) {
    let minDiff = Number.MAX_VALUE;
    let midinumber = -1;
    for (let midi = 0; midi < 128; midi++) {
        let midiFreq = midiToFrequency(midi);
        let freqDiff = Math.abs(midiFreq - frequency);
        if (freqDiff < minDiff) {
            minDiff = freqDiff;
            midinumber = midi;
        }
    }
    return midinumber
}

function noteFromFrequency(frequency, withOctave=false) {
    const midinumber = midiFromFrequency(frequency);
    const pitchclass = midinumber % 12;
    let octave = (midinumber - pitchclass) / 12;
    let notename = notenames[pitchclass];
    if (withOctave) {
        octave--;
        notename += octave;
    }
    return notename;
}

let placeholder = document.getElementById('placeholder');
placeholder.innerHTML = noteFromFrequency;


window.onload = runAfterLoadingPage;
