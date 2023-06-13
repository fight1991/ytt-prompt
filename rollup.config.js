// rollup.config.js
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import glob from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";
var aa = glob.sync("src/ytt/**/*.ts");
console.log(aa);
export default [
  {
    input: "src/index.js",
    output: {
      file: "lib/index.js",
      format: "cjs",
      banner: "#!/usr/bin/env node",
    },
    plugins: [json()],
  },
  {
    input: "src/tools/index.ts",
    output: {
      file: "dist/es/index.js",
      format: "esm",
    },
    plugins: [json(), typescript()],
  },
  {
    input: Object.fromEntries(
      glob
        .sync("src/ytt/**/*.ts")
        .map((file) => [
          path.relative(
            "src",
            file.slice(0, file.length - path.extname(file).length)
          ),
          fileURLToPath(new URL(file, import.meta.url)),
        ])
    ),
    output: {
      format: "es",
      dir: "dist/apis",
    },
    plugins: [json(), typescript()],
  },
];
