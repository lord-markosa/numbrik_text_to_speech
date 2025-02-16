import dotenv from "dotenv";

dotenv.config();

const config = {
    speechKey: process.env.SPEECH_KEY,
    speechRegion: process.env.SPEECH_REGION,
};

export default config;
