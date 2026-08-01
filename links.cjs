const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const fs = require("fs");

async function run() {
  const buf = fs.readFileSync("public/Arnur_Jumabekov_Resume-1.pdf");
  const doc = await pdfjsLib.getDocument({ data: buf }).promise;
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const annots = await page.getAnnotations();
    for (const a of annots) {
      if (a.url) console.log(`PAGE ${i}: ${a.url}`);
    }
  }
}
run().catch((e) => { console.error(e); process.exit(1); });
