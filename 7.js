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


    let frequencyparagraph = document.getElementById("notename")
    console.log ("notename: ", noteFromFrequency(thereminFreq));
    frequencyparagraph.innerHTML = noteFromFrequency(thereminFreq);

    let freqpararaph = document.getElementById("frequency")
    console.log ("frequency: ", thereminFreq(thereminFreq));
    freqpararaph.innerHTML = thereminFreq(thereminFreq);
}

function thereminOff(oscillator) {
    oscillator.stop();
}




let urlParameters = (new URL(document.location)).searchParams;
if (urlParameters.has('oscillator')) {
    let oscillatorType = urlParameters.get('oscillator');
}
if (urlParameters.has('interval')) {
    let semitones = parseInt(urlParameters.get('interval'));
}
if (urlParameters.has('minfreq')) {
    let minfreq = parseInt(urlParameters.get('minfreq'));
}
if (urlParameters.has('maxfreq')) {
    let maxfreq = parseInt(urlParameters.get('maxfreq'));
}




function runAfterLoadingPage() {
    const oscillator = new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: getElementById("oscillatorType"),
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




let notenames = {
    0: "C",
    1: "C#/Db",
    2: "D",
    3: "D#/Eb",
    4: "E",
    5: "F",
    6: "F#/Gb",
    7: "G",
    8: "G#/Ab",
    9: "A",
    10: "A#/Bb",
    11: "B"
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

window.onload = runAfterLoadingPage;
