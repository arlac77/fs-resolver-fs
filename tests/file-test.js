import test from "ava";
import { FileScheme } from "../src/file-scheme";
import { createReadStream, writeFileSync } from "fs";
import { join } from "path";
const { stat } = require("fs").promises;

test("file scheme has name", t => {
  const scheme = new FileScheme();
  t.deepEqual(scheme.name, "file");
});

test("can get", async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aFile = join(__dirname, "..", "tests", "file-test.js");
  const content = await scheme.get(context, new URL("file://" + aFile));
  t.true(content !== undefined);
});

test("can get archive", async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aFile = join(__dirname, "..", "tests", "fixtures", "archive.tar#a.txt");
  const content = await scheme.get(context, new URL("file://" + aFile));
  t.true(content !== undefined);
});

test("can stat", async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aFile = join(__dirname, "..", "tests", "file-test.js");
  const stat = await scheme.stat(context, new URL("file://" + aFile));
  t.true(stat.size > 1000 && stat.size < 10000);
});

test("can put", async t => {
  const context = undefined;

  const scheme = new FileScheme();
  const aFile = join(__dirname, "file2.tmp");
  await scheme.put(
    context,
    new URL("file://" + aFile),
    createReadStream(join(__dirname, "..", "tests", "file-test.js"))
  );
  const stat = await scheme.stat(context, new URL("file://" + aFile));
  t.true(stat.size > 1000 && stat.size < 10000);
});

test("can delete", async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aFile = join(__dirname, "file.tmp");
  writeFileSync(aFile, "someData");

  await scheme.delete(context, new URL("file://" + aFile));

  try {
    await stat(aFile);
  } catch (e) {
    t.is(e.code, "ENOENT");
  }
});

test("can list", async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aDir = join(__dirname);
  const list = await scheme.list(context, new URL("file://" + aDir));
  t.true(list.includes("bundle-test.js"));
});

/*
test('can list async iterator', async t => {
const context = undefined;

  const scheme = new FileScheme();
  const aDir = join(__dirname);
  const list = scheme._list(context, 'file://' + aDir);

  console.log(list);

  for await (const entry of list) {
    t.deepEqual(entry, 'bundle.js');
  }
});
*/

test("list error", async t => {
  function fn() {
    const context = undefined;
    const scheme = new FileScheme();
    return scheme.list(context, new URL("file:///unknown"));
  }

  const error = await t.throws(fn());
  t.is(error.message, `ENOENT: no such file or directory, scandir '/unknown'`);
});
