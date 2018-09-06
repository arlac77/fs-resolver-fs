import babel from "rollup-plugin-babel";
import istanbul from "rollup-plugin-istanbul";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import multiEntry from "rollup-plugin-multi-entry";

export default {
  input: "tests/**/*-test.js",
  output: {
    file: "build/bundle-test.js",
    format: "cjs",
    sourcemap: true,
    interop: false
  },
  external: [
    "ava",
    "fs",
    "path",
    "os",
    "net",
    "tls",
    "util",
    "events",
    "https",
    "http",
    "zlib",
    "stream",
    "tty",
    "url"
  ],
  plugins: [
    multiEntry(),
    resolve(),
    commonjs(),
    babel({
      runtimeHelpers: false,
      externalHelpers: true,
      babelrc: false,
      plugins: ["@babel/plugin-proposal-async-generator-functions"]
    }),
    istanbul({
      exclude: ["tests/**/*-test.js", "node_modules/**/*"]
    })
  ]
};
