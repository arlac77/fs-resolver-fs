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

test.skip("can list", async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aDir = join(__dirname);
  const list = await scheme.list(context, new URL("file://" + aDir));
  t.true(list.includes("bundle-test.js"));
});

test("can list async iterator", async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const list = scheme.list(context, new URL("file://" + __dirname));

  const entries = new Set();

  for await (const entry of list) {
    if (entry !== "nyc") {
      entries.add(entry);
    }
  }

  t.deepEqual(Array.from(entries), [
    "bundle-test.js",
    "bundle-test.js.map",
    "file2.tmp"
  ]);
});

test("list error", async t => {
  const error = await t.throwsAsync(
    async () => {
      const context = undefined;
      const scheme = new FileScheme();
      const list = scheme.list(context, new URL("file:///unknown"));

      for await (const entry of list) {
        console.log(entry);
      }
    },
    {
      code: "ENOENT",
      message: `ENOENT: no such file or directory, scandir '/unknown'`
    }
  );
});
