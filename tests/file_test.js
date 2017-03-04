/* global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  path = require('path'),
  fs = require('fs'),
    FileScheme = require('../dist/FileScheme');

describe('file', () => {
  const scheme = new FileScheme();
  it('has name', () => assert.equal(scheme.name, 'file'));

  it('can get', () => {
    const aFile = path.join(__dirname, 'file_test.js');
    return scheme.get('file://' + aFile).then(s => assert.isDefined(s));
  });

  it('can stat', () => {
    const aFile = path.join(__dirname, 'file_test.js');
    return scheme.stat('file://' + aFile).then(s => {
      assert.equal(s.size,1414);
      assert.isDefined(s); }
    );
  });

  it('can delete', (done) => {
    const aFile = path.join(__dirname, 'file.tmp');
    fs.writeFileSync(aFile, 'someData');
    scheme.delete('file://' + aFile).then(s =>
      fs.stat(aFile, (err, stat) => {
        if (err) {
          done();
        }
      })
    );
  });

  it('can list', () => {
    const aDir = path.join(__dirname);
    return scheme.list('file://' + aDir).then(files => {
      assert.isAtLeast(files.indexOf('file_test.js'), 0);
    });
  });

  it('list error', () => {
    return scheme.list('file://unknown').then(files => assert.ok(undefined)).catch(reject => assert.ok(reject));
  });
});
