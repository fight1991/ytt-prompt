const glob = require("glob");
const path = require("path");
const fsx = require("fs-extra");
const { dedent, noop } = require("vtils");
const aa = glob.sync("src/ytt/**/*.ts");
console.log(process.argv.slice(2));
let dir = 'export * from "./tools/index"\n';
aa.forEach((item) => {
  dir += `export * from "${item
    .replace(/\.ts/g, "")
    .replace(/src\//g, "./")}"\n`;
});

fsx.outputFile(__dirname + "/src/index.ts", dedent`${dir}`);
