import test from 'ava';
import FileScheme from '../src/file-scheme';

const { URL } = require('url');
const path = require('path'),
  fs = require('fs');

test('file scheme has name', t => {
  const scheme = new FileScheme();
  t.deepEqual(scheme.name, 'file');
});

test('can get', async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aFile = path.join(__dirname, '..', 'tests', 'file-test.js');
  const content = await scheme.get(context, new URL('file://' + aFile));
  t.true(content !== undefined);
});

test('can get archive', async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aFile = path.join(
    __dirname,
    '..',
    'tests',
    'fixtures',
    'archive.tar#a.txt'
  );
  const content = await scheme.get(context, new URL('file://' + aFile));
  t.true(content !== undefined);
});

test('can stat', async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aFile = path.join(__dirname, '..', 'tests', 'file-test.js');
  const stat = await scheme.stat(context, new URL('file://' + aFile));
  t.true(stat.size > 1000 && stat.size < 10000);
});

test('can put', async t => {
  const context = undefined;

  const scheme = new FileScheme();
  const aFile = path.join(__dirname, 'file2.tmp');
  await scheme.put(
    context,
    new URL('file://' + aFile),
    fs.createReadStream(path.join(__dirname, '..', 'tests', 'file-test.js'))
  );
  const stat = await scheme.stat(context, new URL('file://' + aFile));
  t.true(stat.size > 1000 && stat.size < 10000);
});

test.cb('can delete', t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aFile = path.join(__dirname, 'file.tmp');
  fs.writeFileSync(aFile, 'someData');

  scheme.delete(context, new URL('file://' + aFile)).then(() => {
    fs.stat(aFile, error => t.end(error ? undefined : 'not deleted'));
  });

  return undefined;
});

test('can list', async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aDir = path.join(__dirname);
  const list = await scheme.list(context, new URL('file://' + aDir));
  t.true(list.includes('file-test.js'));
});

/*
test('can list async iterator', async t => {
const context = undefined;

  const scheme = new FileScheme();
  const aDir = path.join(__dirname);
  const list = scheme._list(context, 'file://' + aDir);

  console.log(list);

  for await (const entry of list) {
    t.deepEqual(entry, 'bundle.js');
  }
});
*/

test('list error', async t => {
  function fn() {
    const context = undefined;
    const scheme = new FileScheme();
    return scheme.list(context, new URL('file:///unknown'));
  }

  const error = await t.throws(fn());
  t.is(error.message, `ENOENT: no such file or directory, scandir '/unknown'`);
});
