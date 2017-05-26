/* jslint node: true, esnext: true */
'use strict';

import babel from 'rollup-plugin-babel';

export default {
  format: 'cjs',
  plugins: [
    babel({
      babelrc: false,
      presets: ['es2015-rollup', 'stage-3'],
      exclude: 'node_modules/**'
    })
  ],
  external: ['url-resolver-fs']
};
