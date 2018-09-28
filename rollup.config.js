import json from "rollup-plugin-json";
import cleanup from "rollup-plugin-cleanup";
import executable from "rollup-plugin-executable";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";

export default {
  plugins: [
    babel({
      runtimeHelpers: false,
      externalHelpers: true,
      babelrc: false,
      plugins: ["@babel/plugin-proposal-async-generator-functions"],
      exclude: "node_modules/**"
    }),
    resolve(),
    commonjs(),
    cleanup()
  ],

  output: {
    file: pkg.main,
    format: "cjs",
    interop: false
  },

  external: ["url-resolver-fs", "util", "fs", "url"],
  input: pkg.module
};
