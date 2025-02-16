import {
    SpeechConfig,
    AudioConfig,
    SpeechSynthesizer,
    ResultReason,
} from "microsoft-cognitiveservices-speech-sdk";
import readline from "readline";
import config from "./config/env.js";

// const sdk = require("microsoft-cognitiveservices-speech-sdk");
// const readline = require("readline");

const audioFile = "YourAudioFile.wav";

const speechConfig = SpeechConfig.fromSubscription(
    config.speechKey,
    config.speechRegion
);

const audioConfig = AudioConfig.fromAudioFileOutput(audioFile);

// The language of the voice that speaks.
speechConfig.speechSynthesisVoiceName = "en-US-AdamMultilingualNeural";

// Create the speech synthesizer.
let synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter some text that you want to speak >\n> ", function (text) {
    rl.close();
    // Start the synthesizer and wait for a result.
    synthesizer.speakTextAsync(
        text,
        function (result) {
            if (result.reason === ResultReason.SynthesizingAudioCompleted) {
                console.log("synthesis finished.");
            } else {
                console.error(
                    "Speech synthesis canceled, " +
                        result.errorDetails +
                        "\nDid you set the speech resource key and region values?"
                );
            }
            synthesizer.close();
            synthesizer = null;
        },
        function (err) {
            console.trace("err - " + err);
            synthesizer.close();
            synthesizer = null;
        }
    );
    console.log("Now synthesizing to: " + audioFile);
});
