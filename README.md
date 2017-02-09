[![npm](https://img.shields.io/npm/v/fs-resolver-fs.svg)](https://www.npmjs.com/package/fs-resolver-fs)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/fs-resolver-fs)
[![Build Status](https://secure.travis-ci.org/arlac77/fs-resolver-fs.png)](http://travis-ci.org/arlac77/fs-resolver-fs)
[![bithound](https://www.bithound.io/github/arlac77/fs-resolver-fs/badges/score.svg)](https://www.bithound.io/github/arlac77/fs-resolver-fs)
[![codecov.io](http://codecov.io/github/arlac77/fs-resolver-fs/coverage.svg?branch=master)](http://codecov.io/github/arlac77/fs-resolver-fs?branch=master)
[![Coverage Status](https://coveralls.io/repos/arlac77/fs-resolver-fs/badge.svg)](https://coveralls.io/r/arlac77/fs-resolver-fs)
[![Code Climate](https://codeclimate.com/github/arlac77/fs-resolver-fs/badges/gpa.svg)](https://codeclimate.com/github/arlac77/fs-resolver-fs)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/fs-resolver-fs/badge.svg)](https://snyk.io/test/github/arlac77/fs-resolver-fs)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/fs-resolver-fs.svg?style=flat-square)](https://github.com/arlac77/fs-resolver-fs/issues)
[![Stories in Ready](https://badge.waffle.io/arlac77/fs-resolver-fs.svg?label=ready&title=Ready)](http://waffle.io/arlac77/fs-resolver-fs)
[![Dependency Status](https://david-dm.org/arlac77/fs-resolver-fs.svg)](https://david-dm.org/arlac77/fs-resolver-fs)
[![devDependency Status](https://david-dm.org/arlac77/fs-resolver-fs/dev-status.svg)](https://david-dm.org/arlac77/fs-resolver-fs#info=devDependencies)
[![docs](http://inch-ci.org/github/arlac77/fs-resolver-fs.svg?branch=master)](http://inch-ci.org/github/arlac77/fs-resolver-fs)
[![downloads](http://img.shields.io/npm/dm/fs-resolver-fs.svg?style=flat-square)](https://npmjs.org/package/fs-resolver-fs)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

fs-resolver-fs
-------------------

[![Greenkeeper badge](https://badges.greenkeeper.io/arlac77/fs-resolver-fs.svg)](https://greenkeeper.io/)
resolves file urls

# API Reference

* <a name="get"></a>

## get(url, [options]) ⇒ <code>Promise</code>
Creates a readable stream for the content of th file associated to a given file URL

**Kind**: global function  
**Fulfil**: <code>ReadableStream</code> - of the file content  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | of the a file |
| [options] | <code>object</code> &#124; <code>string</code> | passed as options to fs.createReadStream() |


* <a name="stat"></a>

## stat(url, [options]) ⇒ <code>Promise</code>
Read stat of a file assiciacted to a given file URL

**Kind**: global function  
**Fulfil**: <code>object</code> - as delivered by fs.stat()  
**Reject**: <code>Error</code> - if url is not a file url or fs.stat() error  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | of the a file |
| [options] | <code>object</code> | unused for now |


* <a name="put"></a>

## put(url, stream, [options]) ⇒ <code>Promise</code>
Put content of a stream to a file associacted to a given file URL

**Kind**: global function  
**Fulfil**: <code>undefined</code> - undefined  
**Reject**: <code>Error</code> - if url is not a file url  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | of the a file |
| stream | <code>Stream</code> | data source |
| [options] | <code>object</code> &#124; <code>string</code> | passed as options to fs.createWriteStream() |


* <a name="delete"></a>

## delete(url) ⇒ <code>Promise</code>
Deletes the file assiciacted to a given file URL

**Kind**: global function  
**Fulfil**: <code>undefined</code> - undefined  
**Reject**: <code>Error</code> - as delivered by fs.unlink()  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | of the a file |


* <a name="list"></a>

## list(url, [options]) ⇒ <code>Promise</code>
List content of a directory

**Kind**: global function  
**Fulfil**: <code>string[]</code> - file names  
**Reject**: <code>Error</code> - as delivered by fs.readdir()  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | of the a directory |
| [options] | <code>object</code> | unused for now |


* * *

# install

With [npm](http://npmjs.org) do:

```shell
npm install fs-resolver-fs
```

license
=======

BSD-2-Clause
