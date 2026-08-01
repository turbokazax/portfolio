import * as pdfParse from "pdf-parse";
import { readFileSync, writeFileSync } from "fs";

const buf = readFileSync("Arnur_Jumabekov_Resume-1.pdf");
const data = await pdfParse.default(buf);
writeFileSync("resume.md", data.text);
console.log("OK pages:", data.numpages, "len:", data.text.length);
const urls = data.text.match(/https?:\/\/[^\s)]+/g);
if (urls) console.log("URLS:\n" + urls.join("\n"));
