// rollup.config.js
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
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
];
