// rollup.config.js
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import glob from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";
import alias from "@rollup/plugin-alias";
// import resolve from "@rollup/plugin-node-resolve";

console.log("env----", process.env.BUILD);
const env = process.env.BUILD;
const config = {
  lib: {
    input: "src/lib/index.js",
    output: {
      file: "dist/lib/index.js",
      format: "cjs",
      banner: "#!/usr/bin/env node",
    },
    plugins: [json()],
  },
  es: {
    input: "./src/index.ts",
    external: ["@maxtropy/components"],
    output: {
      dir: "dist/es",
      format: "esm",
      assetFileNames: "[name][extname]",
      preserveModules: true,
    },
    plugins: [
      alias({
        entries: [
          {
            find: "@core",
            replacement: path.resolve(__dirname, "src/core/index.ts"),
          },
        ],
      }),
      typescript({
        exclude: [],
      }),
    ], // ytt中的文件引用到了core, 所以不能排除
  },
  cjs: {
    input: Object.fromEntries(
      glob
        .sync("src/core/**/*.ts")
        .map((file) => [
          path.relative(
            "src",
            file.slice(0, file.length - path.extname(file).length)
          ),
          fileURLToPath(new URL(file, import.meta.url)),
        ])
    ),
    output: {
      format: "cjs",
      dir: "dist/cjs",
    },
    plugins: [
      typescript({
        exclude: ["./src/tools/*", "./src/ytt/**/*.ts", "./src/index.ts"],
      }),
    ], // 多个入口, 每次执行都会读取tsconfig.json配置, 所以排除不相关文件
  },
};

export default config[env];
