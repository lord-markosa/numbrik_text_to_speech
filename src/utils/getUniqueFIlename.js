import fs from 'fs';

export default function getUniqueFilename(baseName, extension) {
    let counter = 1;
    let uniqueName = `${baseName}.${extension}`;
    while (fs.existsSync(uniqueName)) {
        uniqueName = `${baseName}${counter}.${extension}`;
        counter++;
    }
    return uniqueName;
}
