import {
    SpeechConfig,
    AudioConfig,
    SpeechSynthesizer,
    ResultReason,
} from "microsoft-cognitiveservices-speech-sdk";
import fs from "fs";
import config from "./config/env.js";
import preCheck from "./utils/preCheck.js";
import getUniqueFilename from "./utils/getUniqueFIlename.js";

// Set filenames
const textFile = "input.txt";
const baseAudioFile = "Preview";
const audioExtension = "wav";
const audioFile = getUniqueFilename(baseAudioFile, audioExtension);

// Parse command-line arguments
const args = process.argv.slice(2);
const useSSML = args.includes("--ssml"); // Flag to use SSML
const runPreCheck = args.includes("--precheck"); // Flag to run preCheck

/* Config settings */
const speechConfig = SpeechConfig.fromSubscription(
    config.speechKey,
    config.speechRegion
);

const audioConfig = AudioConfig.fromAudioFileOutput(audioFile);

// The language of the voice that speaks.
/* For NUMBRIK */
// speechConfig.speechSynthesisVoiceName = "en-US-AdamMultilingualNeural";

/* For Narration */
speechConfig.speechSynthesisVoiceName = "en-US-AndrewNeural";

// Create the speech synthesizer.
let synthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

fs.readFile(textFile, "utf8", function (err, text) {
    if (err) {
        console.error("Error reading file: " + err);
        return;
    }

    const input = runPreCheck ? preCheck(text) : text;
    const callback = (result) => {
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
    };
    const onError = (err) => {
        console.trace("err - " + err);
        synthesizer.close();
        synthesizer = null;
    };

    useSSML
        ? synthesizer.speakSsmlAsync(input, callback, onError)
        : synthesizer.speakTextAsync(input, callback, onError);

    console.log("Now synthesizing to: " + audioFile);
});
