
import { convert } from 'pdf-img-convert';
import { writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const pdfDir = 'e:/Primrose Broucher';
const outputDir = path.join(pdfDir, 'images');

if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
}

async function convertPdf(fileName) {
    const filePath = path.join(pdfDir, fileName);
    console.log(`Converting ${filePath}...`);
    try {
        const images = await convert(filePath);
        for (let i = 0; i < images.length; i++) {
            const outputName = `${fileName.replace('.pdf', '')}_page_${i + 1}.png`;
            await writeFile(path.join(outputDir, outputName), images[i]);
            console.log(`Saved ${outputName}`);
        }
    } catch (err) {
        console.error(`Error converting ${fileName}:`, err);
    }
}

async function main() {
    // Just convert the first one for now to check the design
    await convertPdf('Primrose Broucher 2026  1.pdf');
    // And maybe the 2nd one
    await convertPdf('Primrose Broucher 2026  2.pdf');
}

main();
