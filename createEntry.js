const glob = require("glob");
const path = require("path");
const fsx = require("fs-extra");
const { dedent, noop } = require("vtils");
const aa = glob.sync("src/ytt/**/*.ts");

let dir = 'export * as tools from "./tools/index"\n';
aa.forEach((item) => {
  const filename = path.parse(item).name;

  dir += `export * as ${filename} from "${item
    .replace(/.ts/g, "")
    .replace(/src\//g, "./")}"\n`;
});

fsx.outputFile(__dirname + "/src/index.ts", dedent`${dir}`);
