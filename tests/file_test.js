/* global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
'use strict';

const path = require('path'),
  fs = require('fs');

import FileScheme from '../src/FileScheme';

import test from 'ava';

test('file scheme has name', t => {
  const scheme = new FileScheme();
  t.deepEqual(scheme.name, 'file');
});

test('can get', async t => {
  const scheme = new FileScheme();
  const aFile = path.join(__dirname, '..', 'file_test.js');
  const content = await scheme.get('file://' + aFile);
  t.true(content !== undefined);
});

test('can stat', async t => {
  const scheme = new FileScheme();
  const aFile = path.join(__dirname, '..', 'file_test.js');
  const stat = await scheme.stat('file://' + aFile);
  t.is(stat.size, 1540);
});

test.cb('can delete', t => {
  const scheme = new FileScheme();
  const aFile = path.join(__dirname, 'file.tmp');
  fs.writeFileSync(aFile, 'someData');

  scheme.delete('file://' + aFile).then(() => {
    fs.stat(aFile, (error, stat) => {
      t.end(error ? undefined : 'not deleted');
    })
  });

  return undefined;
});

test('can list', async t => {
  const scheme = new FileScheme();
  const aDir = path.join(__dirname);
  const list = await scheme.list('file://' + aDir);
  t.deepEqual(list[0], 'bundle.js');
});

test('list error', async t => {
  function fn() {
    const scheme = new FileScheme();
    return scheme.list('file://unknown');
  };

  const error = await t.throws(fn());
  t.is(error.message, "ENOENT: no such file or directory, scandir \'unknown\'");
});
