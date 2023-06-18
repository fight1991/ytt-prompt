const glob = require("glob");
const path = require("path");
const fsx = require("fs-extra");
const { dedent, noop } = require("vtils");
const aa = glob.sync("src/ytt/**/*.ts");
console.log(aa);
let dir = "";
aa.forEach((item) => {
  const filename = path.parse(item).name;
  console.log(filename);
  dir += `export * as ${filename} from "${item
    .replace(/.ts/g, "")
    .replace(/src\//g, "../")}"\n`;
});
console.log(dir);
fsx.outputFile(__dirname + "/index.ts", dedent`${dir}`);
