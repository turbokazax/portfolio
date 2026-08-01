import { spawn } from "child_process";
import { writeFileSync } from "fs";

const proc = spawn("npx", ["pdf2md", "Arnur_Jumabekov_Resume-1.pdf", "resume-output"], { stdio: "inherit" });
proc.on("close", (code) => process.exit(code));
