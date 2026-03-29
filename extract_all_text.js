
const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const pdfDir = 'e:/Primrose Broucher';
const outputData = [];

async function extractText(fileName) {
    const filePath = path.join(pdfDir, fileName);
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    const dataBuffer = fs.readFileSync(filePath);
    try {
        // Based on previous checks, pdf.PDFParse is a constructor
        const parse = pdf.PDFParse;
        const instance = new parse(dataBuffer);
        // Usually these libraries have a parse() or thenable
        const data = await instance; 
        return {
            file: fileName,
            page: fileName.split(' ').pop().replace('.pdf', ''),
            text: data.text ? data.text.trim() : ""
        };
    } catch (err) {
        console.error(`Error parsing ${fileName}:`, err);
        return null;
    }
}

async function main() {
    for (let i = 1; i <= 12; i++) {
        const fileName = `Primrose Broucher 2026  ${i}.pdf`;
        const result = await extractText(fileName);
        if (result) {
            outputData.push(result);
            console.log(`Successfully extracted ${fileName}`);
        }
    }
    fs.writeFileSync(path.join(pdfDir, 'extracted_content.json'), JSON.stringify(outputData, null, 2));
    console.log('Extraction complete.');
}

main();
