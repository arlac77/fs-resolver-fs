import babel from 'rollup-plugin-babel';

export default {
  input: 'tests/file-test.js',
  external: ['ava', 'url-resolver-fs'],

  plugins: [
    babel({
      babelrc: false,
      presets: ['stage-3'],
      exclude: 'node_modules/**'
    })
  ],

  output: {
    file: 'build/file-test.js',
    format: 'cjs',
    sourcemap: true
  }
};
