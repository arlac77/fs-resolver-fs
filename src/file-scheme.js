import { URLScheme } from 'url-resolver-fs';

const fs = require('fs');
const { promisify } = require('util');
const { URL } = require('url');

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
   * @param context {Context} execution context
   * @param url {URL} of the a file
   * @param [options] {object|string} passed as options to fs.createReadStream()
   * @returns {Promise}
   * @fulfil {ReadableStream} - of the file content
   */
  get(context, url, options) {
    if (url.protocol === 'file:') {
      return Promise.resolve(fs.createReadStream(url.pathname, options));
    }

    return invalidURLError(url);
  }

  /**
   * Read stat of a file assiciated to a given file URL
   * @param context {Context} execution context
   * @param url {URL} of the a file
   * @param [options] {object} unused for now
   * @returns {Promise}
   * @fulfil {object} - as delivered by fs.stat()
   * @reject {Error} - if url is not a file url or fs.stat() error
   */
  stat(context, url, options) {
    return url2file(_stat, url);
  }

  /**
   * Put content of a stream to a file associated to a given file URL
   * @param context {Context} execution context
   * @param url {URL} of the a file
   * @param stream {Stream} data source
   * @param [options] {object|string} passed as options to fs.createWriteStream()
   * @returns {Promise}
   * @fulfil {undefined} - undefined
   * @reject {Error} - if url is not a file url
   */
  put(context, url, stream, options) {
    if (url.protocol === 'file:') {
      return new Promise((fullfill, reject) => {
        stream.pipe(fs.createWriteStream(url.pathname, options));
        stream.once('end', () => fullfill());
      });
    }

    return invalidURLError(url);
  }

  /**
   * Deletes the file assiciated to a given file URL
   * @param context {Context} execution context
   * @param url {URL} of the a file
   * @returns {Promise}
   * @fulfil {undefined} - undefined
   * @reject {Error} - as delivered by fs.unlink()
   */
  delete(context, url) {
    return url2file(_unlink, url);
  }

  /**
   * List content of a directory
   * @param context {Context} execution context
   * @param url {URL} of the a directory
   * @param {object} [options] unused for now
   * @returns {Promise}
   * @fulfil {string[]} - file names
   * @reject {Error} - as delivered by fs.readdir()
   */
  list(context, url, options) {
    return url2file(_readdir, url);
  }

  /**
   * List content of a directory
   * @param context {Context} execution context
   * @param url {URL} of the a directory
   * @param {object} [options] unused for now
   * @returns {Iterator}
   */
  async *_list(context, url, options) {
    const list = await url2file(_readdir, url);
    for (const entry of list) {
      yield entry;
    }
  }
}

function url2file(func, url) {
  return url.protocol === 'file:' ? func(url.pathname) : invalidURLError(url);
}
