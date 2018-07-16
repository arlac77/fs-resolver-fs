import executable from 'rollup-plugin-executable';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default {
  plugins: [resolve(), commonjs()],

  output: {
    file: pkg.main,
    format: 'cjs',
    interop: false
  },

  external: ['url-resolver-fs', 'util', 'url', 'fs'],
  input: pkg.module
};
