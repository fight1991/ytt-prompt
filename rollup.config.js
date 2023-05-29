// rollup.config.js
import json from "@rollup/plugin-json";

export default {
  input: "index.js",
  output: {
    file: "lib/index.js",
    format: "cjs",
  },
  plugins: [json()],
};
