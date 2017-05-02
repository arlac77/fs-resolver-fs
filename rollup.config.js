/* jslint node: true, esnext: true */
'use strict';

export default {
  format: 'cjs',
  plugins: [
    'transform-async-generator-functions'
  ],
  external: ['url-resolver-fs']
};
