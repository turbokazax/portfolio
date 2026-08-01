const mod = require("pdf-parse");
const pdfParse = mod.default || mod.pdfParse || mod;
const fs = require("fs");
console.log("keys:", Object.keys(mod));
const buf = fs.readFileSync("public/Arnur_Jumabekov_Resume-1.pdf");
pdfParse(buf).then((d) => {
  fs.writeFileSync("resume.md", d.text);
  console.log("OK pages", d.numpages, "len", d.text.length);
  const u = d.text.match(/https?:\/\/[^\s)]+/g);
  if (u) console.log("URLS:\n" + u.join("\n"));
}).catch((e) => { console.error("ERR", e.message); process.exit(1); });
