import {
    SpeechConfig,
    AudioConfig,
    SpeechSynthesizer,
    ResultReason,
} from "microsoft-cognitiveservices-speech-sdk";
import config from "./config/env.js";
import fs from "fs";

const textFile = "input.txt";
const audioFile = "Preview.wav";

const speechConfig = SpeechConfig.fromSubscription(
    config.speechKey,
    config.speechRegion
);

const audioConfig = AudioConfig.fromAudioFileOutput(audioFile);

// The language of the voice that speaks.
speechConfig.speechSynthesisVoiceName = "en-US-AdamMultilingualNeural";

// Create the speech synthesizer.
let synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

fs.readFile(textFile, "utf8", function (err, text) {
    if (err) {
        console.error("Error reading file: " + err);
        return;
    }

    synthesizer.speakTextAsync(
        text,
        (result) => {
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
        (err) => {
            console.trace("err - " + err);
            synthesizer.close();
            synthesizer = null;
        }
    );

    console.log("Now synthesizing to: " + audioFile);
});
