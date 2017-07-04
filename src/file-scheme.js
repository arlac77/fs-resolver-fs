import { URLScheme } from 'url-resolver-fs';

const fs = require('fs');
const { promisify } = require('util');

function invalidURLError(url) {
  Promise.reject(new Error(`Invalid file url: ${url}`));
}

const _stat = promisify(fs.stat);
const _unlink = promisify(fs.unlink);
const _readdir = promisify(fs.readdir);

/**
 * URLScheme for file system access
 */
export default class FileScheme extends URLScheme {
  /**
   * Scheme name if 'file'
   * @return {string} 'file'
   */
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
   * Read stat of a file assiciated to a given file URL
   * @param {string} url of the a file
   * @param {object} [options] unused for now
   * @returns {Promise}
   * @fulfil {object} - as delivered by fs.stat()
   * @reject {Error} - if url is not a file url or fs.stat() error
   */
  stat(url, options) {
    return url2file(_stat, url);
  }

  /**
   * Put content of a stream to a file associated to a given file URL
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
        stream.once('end', () => fullfill());
      });
    }

    return invalidURLError(url);
  }

  /**
   * Deletes the file assiciated to a given file URL
   * @param {string} url of the a file
   * @returns {Promise}
   * @fulfil {undefined} - undefined
   * @reject {Error} - as delivered by fs.unlink()
   */
  delete(url) {
    return url2file(_unlink, url);
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
    return url2file(_readdir, url);
  }

  /**
   * List content of a directory
   * @param {string} url of the a directory
   * @param {object} [options] unused for now
   * @returns {Iterator}
   */
  async *_list(url, options) {
    const list = await url2file(_readdir, url);
    for (const entry of list) {
      yield entry;
    }
  }
}

function url2file(func, url) {
  const m = url.match(/^file:\/\/(.*)/);
  if (m) {
    return func(m[1]);
  }
  return invalidURLError(url);
}
