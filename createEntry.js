const glob = require("glob");
// const path = require("path");
const fsx = require("fs-extra");
const { dedent } = require("vtils");
const pathList = glob.sync("src/ytt/**/*.ts");

let dir = 'export * from "./tools/index"\n';
pathList.forEach((item) => {
  dir += `export * from "${item
    .replace(/\.ts/g, "")
    .replace(/src\//g, "./")}"\n`;
});

fsx.outputFile(__dirname + "/src/index.ts", dedent`${dir}`);
