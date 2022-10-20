import test from "ava";
import { FileScheme } from "../src/file-scheme";
import fs, { createReadStream, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const here = dirname(fileURLToPath(import.meta.url));

test("file scheme has name", t => {
  const scheme = new FileScheme();
  t.deepEqual(scheme.name, "file");
});

test("can get", async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aFile = join(here, "..", "tests", "file-test.mjs");
  const content = await scheme.get(context, new URL("file://" + aFile));
  t.true(content !== undefined);
});

test("can get archive", async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aFile = join(here, "..", "tests", "fixtures", "archive.tar#a.txt");
  const content = await scheme.get(context, new URL("file://" + aFile));
  t.true(content !== undefined);
});

test("can stat", async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aFile = join(here, "..", "tests", "file-test.mjs");
  const stat = await scheme.stat(context, new URL("file://" + aFile));
  t.true(stat.size > 1000 && stat.size < 10000);
});

test("can put", async t => {
  const context = undefined;

  const scheme = new FileScheme();
  const aFile = join(here, "file2.tmp");
  await scheme.put(
    context,
    new URL("file://" + aFile),
    createReadStream(join(here, "..", "tests", "file-test.mjs"))
  );
  const stat = await scheme.stat(context, new URL("file://" + aFile));
  t.true(stat.size > 1000 && stat.size < 10000);
});

test("can delete", async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const aFile = join(here, "file.tmp");
  writeFileSync(aFile, "someData");

  await scheme.delete(context, new URL("file://" + aFile));

  try {
    await fs.promises.stat(aFile);
  } catch (e) {
    t.is(e.code, "ENOENT");
  }
});

test("can list", async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const list = [];
  for await (const entry of scheme.list(context, new URL("file://" + here))) {
    list.push(entry);
  }

  t.true(list.includes("file-test.mjs"));
});

test("can list async iterator", async t => {
  const context = undefined;
  const scheme = new FileScheme();
  const list = scheme.list(context, new URL("file://" + here));

  const entries = new Set();

  for await (const entry of list) {
    entries.add(entry);
  }

  t.deepEqual(Array.from(entries), ["file-test.mjs", "file2.tmp", "fixtures"]);
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
