import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default {
  plugins: [resolve(), commonjs()],

  output: {
    file: pkg.main,
    format: 'cjs'
  },

  external: ['url-resolver-fs', 'util', 'url'],
  input: pkg.module
};
