
const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('Primrose Broucher 2026  1.pdf');

pdf(dataBuffer).then(function(data) {
    // number of pages
    console.log('Pages:', data.numpages);
    // number of rendered pages
    console.log('Rendered:', data.numrender);
    // PDF info
    console.log('Info:', data.info);
    // PDF metadata
    console.log('Metadata:', data.metadata); 
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log('Version:', data.version);
    // PDF text
    console.log('Text:', data.text); 
}).catch(err => {
    console.error(err);
});
