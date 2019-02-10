import { URLScheme } from "url-resolver-fs";
import fs, { createReadStream, createWriteStream } from "fs";

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
  async get(context, url, options) {
    return createReadStream(url, options);
  }

  /**
   * Read stat of a file assiciated to a given file URL
   * @param {Context} context execution context
   * @param {URL} url of the a file
   * @param {Object} options unused for now
   * @returns {Object|Error} as delivered by fs.stat()
   */
  stat(context, url, options) {
    return fs.promises.stat(url);
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
    return new Promise((resolve, reject) => {
      stream.pipe(createWriteStream(url, options));
      stream.once("end", () => resolve());
    });
  }

  /**
   * Deletes the file assiciated to a given file URL
   * @param {Context} context execution context
   * @param {URL} url of the a file
   * @returns {Object|Error} as delivered by fs.unlink()
   */
  delete(context, url) {
    return fs.promises.unlink(url);
  }

  /**
   * List content of a directory
   * @param {Context} context execution context
   * @param {URL} url of the a directory
   * @param {Object} options unused for now
   * @returns {Iterator}
   */
  async *list(context, url, options) {
    for (const entry of await fs.promises.readdir(url)) {
      yield entry;
    }
  }
}
