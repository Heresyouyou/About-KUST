import * as fs from "fs";
const css = fs.readFileSync("./dist/output.css").toString();

const styles = {};
const lines = [];
for (const match of css.matchAll(/^\.(.+?)\s*\{(.+?)\}/igsm)) {
  const cls = match[1].replace(/\\/g, "");
  let selector = cls.replace(/\//g, "$").replace(/\./g, "_").replace(/-/g, "_");
  const arr = selector.split("_");
  const css = match[2].replace(/\s+/g, " ");
  styles[selector] = {cls, css};
  if (/^[a-z]/.test(selector) === false) {
    selector = `'${selector}'`;
  }
  lines.push(`/**\n *${css}\n */\nexport const ${selector} = '${cls}';`);
}
fs.writeFileSync("./src/assets/tw2.ts", JSON.stringify(styles, null, 2));
fs.writeFileSync("./src/assets/tw.ts", lines.join('\n\n'));

