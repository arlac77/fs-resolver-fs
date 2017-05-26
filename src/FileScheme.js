/* jslint node: true, esnext: true */

'use strict';

const fs = require('fs');

import { 
  URLScheme
}
from 'url-resolver-fs';

function invalidURLError(url) {
  Promise.reject(new Error(`Invalid file url: ${url}`));
}

/**
 * URLScheme for file system access
 */
export default class FileScheme extends URLScheme {

  static get name() {
    return 'file';
  }

  /**
   * Creates a readable stream for the content of th file associated to a given file URL
   * @param {string} url of the a file
   * @param {object|string} [options] passed as options to fs.createReadStream()
   * @returns {Promise}
   * @fulfil {ReadableStream} - of the file content
   */
  get(url, options) {
    const m = url.match(/^file:\/\/(.*)/);
    if (m) {
      return Promise.resolve(fs.createReadStream(m[1], options));
    }

    return invalidURLError(url);
  }

  /**
   * Read stat of a file assiciacted to a given file URL
   * @param {string} url of the a file
   * @param {object} [options] unused for now
   * @returns {Promise}
   * @fulfil {object} - as delivered by fs.stat()
   * @reject {Error} - if url is not a file url or fs.stat() error
   */
  stat(url, options) {
    return promisify(fs.stat, url);
  }

  /**
   * Put content of a stream to a file associacted to a given file URL
   * @param {string} url of the a file
   * @param {Stream} stream data source
   * @param {object|string} [options] passed as options to fs.createWriteStream()
   * @returns {Promise}
   * @fulfil {undefined} - undefined
   * @reject {Error} - if url is not a file url
   */
  put(url, stream, options) {
    const m = url.match(/^file:\/\/(.*)/);
    if (m) {
      return new Promise((fullfill, reject) => {
        stream.pipe(fs.createWriteStream(m[1], options));
        stream.once('end', () =>
          fullfill()
        );
      });
    }

    return invalidURLError(url);
  }

  /**
   * Deletes the file assiciacted to a given file URL
   * @param {string} url of the a file
   * @returns {Promise}
   * @fulfil {undefined} - undefined
   * @reject {Error} - as delivered by fs.unlink()
   */
  delete(url) {
    return promisify(fs.unlink, url);
  }

  /**
   * List content of a directory
   * @param {string} url of the a directory
   * @param {object} [options] unused for now
   * @returns {Promise}
   * @fulfil {string[]} - file names
   * @reject {Error} - as delivered by fs.readdir()
   */
  list(url, options) {
    return promisify(fs.readdir, url);
  }

  /**
   * List content of a directory
   * @param {string} url of the a directory
   * @param {object} [options] unused for now
   * @returns {Iterator}
   */
  async * _list(url, options) {
    const list = await promisify(fs.readdir, url);
    for (const entry of list) {
      yield entry;
    }
  }
}

function promisify(func, url) {
  const m = url.match(/^file:\/\/(.*)/);
  if (m) {
    return new Promise((fullfill, reject) => {
      func(m[1], (err, files) => {
        if (err) {
          reject(err);
        } else {
          fullfill(files);
        }
      });
    });
  }
  return invalidURLError(url);
}
