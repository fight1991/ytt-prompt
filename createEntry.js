const glob = require("glob");
const path = require("path");
const fsx = require("fs-extra");
const { dedent, noop } = require("vtils");
const aa = glob.sync("src/ytt/**/*.ts");
console.log(aa);
let dir = 'export * as tools from "./tools/index"\n';
aa.forEach((item) => {
  const filename = path.parse(item).name;
  console.log(filename);
  dir += `export * as ${filename} from "${item
    .replace(/.ts/g, "")
    .replace(/src\//g, "./")}"\n`;
});
console.log(dir);
console.log(__dirname + "./src/index.ts");
fsx.outputFile(__dirname + "/src/index.ts", dedent`${dir}`);
