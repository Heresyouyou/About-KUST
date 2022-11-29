
/**
 * Use TypeScript Ast to convert TypeScript's types into JSON schemas
 */
var ts = require("typescript");
var fs = require("fs");
var util = require("util");


/**
 * TypeScript 用 kind 字段来标记“类型”,
 * 这里记录一下 kind 不同的值所对应变量类型
 */
const typescriptKindMap = {
  143: "number",
  146: "string"
};


const ast = ts.createSourceFile(
  "sample.ts",
  fs.readFileSync("./scripts/sample.ts").toString(),
  ts.ScriptTarget.ES6,
  true
);

const map = new Map();
fs.writeFileSync("./scripts/sample.json", JSON.stringify(ast, (k, v) => {
  if (typeof v === "object" && map.has(v)) {
    return `{Circular}`;
  }
  map.set(v, true);
  return v;
}, 2));

console.log(util.inspect(ast));
