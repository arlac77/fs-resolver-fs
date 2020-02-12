[![npm](https://img.shields.io/npm/v/fs-resolver-fs.svg)](https://www.npmjs.com/package/fs-resolver-fs)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![minified size](https://badgen.net/bundlephobia/min/fs-resolver-fs)](https://bundlephobia.com/result?p=fs-resolver-fs)
[![downloads](http://img.shields.io/npm/dm/fs-resolver-fs.svg?style=flat-square)](https://npmjs.org/package/fs-resolver-fs)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/fs-resolver-fs.svg?style=flat-square)](https://github.com/arlac77/fs-resolver-fs/issues)
[![Build Status](https://secure.travis-ci.org/arlac77/fs-resolver-fs.png)](http://travis-ci.org/arlac77/fs-resolver-fs)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/fs-resolver-fs/badge.svg)](https://snyk.io/test/github/arlac77/fs-resolver-fs)
[![Greenkeeper](https://badges.greenkeeper.io/arlac77/fs-resolver-fs.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/fs-resolver-fs)

## fs-resolver-fs

resolves file urls

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [FileScheme](#filescheme)
    -   [get](#get)
        -   [Parameters](#parameters)
    -   [stat](#stat)
        -   [Parameters](#parameters-1)
    -   [put](#put)
        -   [Parameters](#parameters-2)
    -   [delete](#delete)
        -   [Parameters](#parameters-3)
    -   [list](#list)
        -   [Parameters](#parameters-4)
    -   [name](#name)

## FileScheme

**Extends URLScheme**

URLScheme for file system access

### get

Creates a readable stream for the content of th file associated to a given file URL

#### Parameters

-   `context` **Context** execution context
-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** of the a file
-   `options` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** passed as options to fs.createReadStream()

Returns **ReadableStream** of the file content

### stat

Read stat of a file assiciated to a given file URL

#### Parameters

-   `context` **Context** execution context
-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** of the a file
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** unused for now

Returns **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error))** as delivered by fs.stat()

### put

Put content of a stream to a file associated to a given file URL

#### Parameters

-   `context`  {Context} execution context
-   `url`  {URL} of the a file
-   `stream`  {Stream} data source
-   `options` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** passed as options to fs.createWriteStream()

Returns **([undefined](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/undefined) \| [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error))** if url is not a file url

### delete

Deletes the file assiciated to a given file URL

#### Parameters

-   `context` **Context** execution context
-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** of the a file

Returns **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error))** as delivered by fs.unlink()

### list

List content of a directory

#### Parameters

-   `context` **Context** execution context
-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** of the a directory
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** unused for now

Returns **Iterator** 

### name

Scheme name if 'file'

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 'file'

# install

With [npm](http://npmjs.org) do:

```shell
npm install fs-resolver-fs
```

# license

BSD-2-Clause
