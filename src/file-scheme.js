import { URLScheme } from "url-resolver-fs";
import { createReadStream, createWriteStream } from "fs";
const { stat, unlink, readdir } = require("fs").promises;

function invalidURLError(url) {
  Promise.reject(new Error(`Invalid file url: ${url}`));
}

/**
 * URLScheme for file system access
 */
export class FileScheme extends URLScheme {
  /**
   * Scheme name if 'file'
   * @return {string} 'file'
   */
  static get name() {
    return "file";
  }

  /**
   * Creates a readable stream for the content of th file associated to a given file URL
   * @param {Context} context execution context
   * @param {URL} url of the a file
   * @param {Object|string} options passed as options to fs.createReadStream()
   * @returns {ReadableStream} of the file content
   */
  get(context, url, options) {
    if (url.protocol === "file:") {
      return Promise.resolve(createReadStream(url.pathname, options));
    }

    return invalidURLError(url);
  }

  /**
   * Read stat of a file assiciated to a given file URL
   * @param {Context} context execution context
   * @param {URL} url of the a file
   * @param {Object} options unused for now
   * @returns {Object|Error} as delivered by fs.stat()
   */
  stat(context, url, options) {
    return url2file(stat, url);
  }

  /**
   * Put content of a stream to a file associated to a given file URL
   * @param context {Context} execution context
   * @param url {URL} of the a file
   * @param stream {Stream} data source
   * @param {Object|string} options passed as options to fs.createWriteStream()
   * @returns {undefined|Error} if url is not a file url
   */
  put(context, url, stream, options) {
    if (url.protocol === "file:") {
      return new Promise((fullfill, reject) => {
        stream.pipe(createWriteStream(url.pathname, options));
        stream.once("end", () => fullfill());
      });
    }

    return invalidURLError(url);
  }

  /**
   * Deletes the file assiciated to a given file URL
   * @param {Context} context execution context
   * @param {URL} url of the a file
   * @returns {Object|Error} as delivered by fs.unlink()
   */
  delete(context, url) {
    return url2file(unlink, url);
  }

  /**
   * List content of a directory
   * @param {Context} context execution context
   * @param {URL} url of the a directory
   * @param {Object} options unused for now
   * @returns {Promise}
   * @returns {Object|Error} as delivered by fs.readdir()
   */
  list(context, url, options) {
    return url2file(readdir, url);
  }

  /**
   * List content of a directory
   * @param {Context} context execution context
   * @param {URL} url of the a directory
   * @param {Object} options unused for now
   * @returns {Iterator}
   */
  async *_list(context, url, options) {
    const list = await url2file(readdir, url);
    for (const entry of list) {
      yield entry;
    }
  }
}

function url2file(func, url) {
  return url.protocol === "file:" ? func(url.pathname) : invalidURLError(url);
}
