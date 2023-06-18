// rollup.config.js
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import glob from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
    plugins: [typescript()],
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
      format: "esm",
      dir: "dist/apis",
    },
    plugins: [typescript({ exclude: ["./src/tools/*"] })], // 多个入口, 每次执行都会读取tsconfig.json配置, 所以排除tools文件
  },
];
