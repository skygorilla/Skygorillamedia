import * as fs from "fs";

const css = fs.readFileSync("src/styles/tokens.css", "utf8");
const required = ["--space-", "--shadow-", "--duration-", "--bp-"];
const missing = required.filter(t => !css.includes(t));
if (missing.length) {
  console.error("Missing CSS token families:", missing.join(", "));
  process.exit(1);
}

const files = process.argv.slice(2);
const BEM = /(\.[a-z0-9]+(?:-[a-z0-9]+)*)__(?:[a-z0-9]+(?:-[a-z0-9]+)*)(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?/g;
let nonBem = 0;

for (const f of files) {
  const content = fs.readFileSync(f, "utf8");
  const classes = [...content.matchAll(/\.[A-Za-z0-9\-\_]+/g)].map(m => m[0]);
  for (const c of classes) {
    if (c.startsWith(".sg-") && !BEM.test(c)) {
      console.error("Non-BEM selector:", c, "in", f);
      nonBem++;
    }
  }
}
if (nonBem) process.exit(2);