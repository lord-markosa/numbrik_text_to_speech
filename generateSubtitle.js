import fs from "fs";

/**
 * Function to split text into lines of 5 to 7 words.
 * @param {string} text - The input text.
 * @returns {Array} - Array of subtitle lines.
 */
function splitTextIntoLines(text) {
    const words = text.split(/\s+/); // Split text into words
    const lines = [];
    let currentLine = [];

    words.forEach((word) => {
        currentLine.push(word);
        if (
            currentLine.length >= 3 ||
            word.endsWith(".") ||
            word.endsWith(",")
        ) {
            lines.push(currentLine.join(" "));
            currentLine = [];
        }
    });

    // Add any remaining words as the last line
    if (currentLine.length > 0) {
        lines.push(currentLine.join(" "));
    }

    return lines;
}

/**
 * Function to generate SRT subtitles from text.
 * @param {string} text - The input text.
 * @returns {string} - The SRT formatted subtitles.
 */
function generateSRT(text) {
    const lines = splitTextIntoLines(text);
    let srtContent = "";
    let startTime = 0;

    lines.forEach((line, index) => {
        const endTime = startTime + 1; // Each line is displayed for 2 seconds
        const startTimeFormatted = formatTime(startTime);
        const endTimeFormatted = formatTime(endTime);

        srtContent += `${index + 1}\n`;
        srtContent += `${startTimeFormatted} --> ${endTimeFormatted}\n`;
        srtContent += `${line}\n\n`;

        startTime = endTime;
    });

    return srtContent;
}

/**
 * Function to format time in SRT format (hh:mm:ss,ms).
 * @param {number} seconds - The time in seconds.
 * @returns {string} - The formatted time.
 */
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0");
    const minutes = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
    const secs = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");
    const milliseconds = "000";

    return `${hours}:${minutes}:${secs},${milliseconds}`;
}

// Example usage

const inputFilePath = "input.txt";

fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading input file:", err);
        return;
    }

    const srtContent = generateSRT(
        data
            .replace(/<[^>]+>/g, "") // Remove all XML/HTML tags
            .replace(/\s+/g, " ") // Replace multiple spaces with a single space
            .replace(/\. /g, ".\n")
            .trim()
    );

    // Save the SRT content to a file
    const outputFilePath = "output.srt";
    fs.writeFileSync(outputFilePath, srtContent, "utf8");

    console.log(`Subtitles saved to ${outputFilePath}`);
});
