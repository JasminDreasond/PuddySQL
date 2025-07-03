// 🧪 PuddySQL Test Playground
// ╔═══════════════════════════════════════════════╗
// ║        💾 Interactive SQL Test Suite          ║
// ║         Powered by: PuddySQL Engine 🍮         ║
// ╚═══════════════════════════════════════════════╝

import stringify from 'safe-stable-stringify';
import { ColorSafeStringify } from 'tiny-essentials';
import PuddySql from '../dist/index.mjs';

const colorJsonSafe = new ColorSafeStringify();
const colorSafeStringify = (json, space = 0) =>
  colorJsonSafe.colorize(stringify(json, null, space));

// 🚀 Create SQL Engine Instance
const db = new PuddySql.Instance();

(async () => {
  console.log('\n🔧 \x1b[1mInitializing SQLite3...\x1b[0m\n');
  await db.initSqlite3();

  const table = await db.initTable({ name: 'tinytest', id: 'id', order: 'id ASC' }, [
    ['id', 'TEXT', 'PRIMARY KEY'],
    ['prompt', 'TEXT'],
    ['yay', 'BOOLEAN'],
  ]);

  console.log('\n📥 \x1b[36mInserting test data...\x1b[0m\n');
  console.table(
    await Promise.all([
      table.set('1', { prompt: '🍮 pudding', yay: true }),
      table.set('2', { prompt: '🍪 cookie', yay: true }),
      table.set('3', { prompt: '🍫 brigadeiro', yay: true }),
      table.set('4', { prompt: '🍌 banana', yay: false }),
      table.set('5', { prompt: '🍫 chocolate', yay: true }),
    ]),
  );

  console.log('\n📃 \x1b[1mAll Records:\x1b[0m\n');
  console.table(await table.getAll());

  console.log('\n🔍 \x1b[33mGetting record with ID = 1\x1b[0m\n');
  console.log(colorSafeStringify(await table.get('1')));

  console.log('\n📝 \x1b[35mUpdating ID = 4 (yay = true)\x1b[0m\n');
  await table.set('4', { yay: true });
  console.log(colorSafeStringify(await table.get('4')));

  console.log('\n📝 \x1b[35mUpdating ID = 4 (yay = false)\x1b[0m\n');
  await table.set('4', { yay: false });
  console.log(colorSafeStringify(await table.get('4')));

  console.log('\n🗑️ \x1b[31mDeleting ID = 2\x1b[0m\n');
  await table.delete('2');
  console.table(await table.getAll());

  console.log('\n🔎 \x1b[1;34mSearch: prompt = pudding\x1b[0m\n');
  console.log(
    colorSafeStringify(
      await table.search({
        q: { group: 'AND', conditions: [{ column: 'prompt', value: '🍮 pudding' }] },
      }),
      1,
    ),
  );

  console.log('\n🔎 \x1b[1;34mOR Search: pudding or yay = false\x1b[0m\n');
  console.log(
    colorSafeStringify(
      await table.search({
        q: {
          group: 'OR',
          conditions: [
            { column: 'prompt', value: '🍮 pudding' },
            { column: 'yay', value: false },
          ],
        },
      }),
      1,
    ),
  );

  console.log('\n📚 \x1b[32mPaginated Search (2 per page)\x1b[0m\n');
  const page1 = await table.search({ q: {}, perPage: 2, page: 1, order: 'id ASC' });
  console.table(page1.items);

  console.log('\n📚 \x1b[32mPaginated Search (Page 2)\x1b[0m\n');
  const page2 = await table.search({ q: {}, perPage: 2, page: 2, order: 'id ASC' });
  console.table(page2.items);
  console.table({ totalPages: page2.totalPages, totalItems: page2.totalItems });

  console.log('\n📌 \x1b[36mGetting first 3 records\x1b[0m\n');
  console.table(await table.getAmount(3));

  console.log('\n🧹 \x1b[31mDeleting all yay = false...\x1b[0m\n');
  const deleted = await table.advancedDelete({ yay: { value: false } });
  console.log(`\x1b[33mDeleted rows: ${deleted}\x1b[0m`);

  console.log('\n🧾 \x1b[1mFinal Records:\x1b[0m\n');
  console.table(await table.getAll());

  // 🏷️ Tags Test
  console.log('\n🏷️ \x1b[1mCreating tagged_posts table...\x1b[0m\n');
  const tagTable = await db.initTable({ name: 'tagged_posts', id: 'id' }, [
    ['id', 'TEXT', 'PRIMARY KEY'],
    ['title', 'TEXT'],
    ['tags', 'TAGS'],
  ]);

  const tagManager = tagTable.getTagEditor('tags');

  await tagTable.set('a1', { title: 'Post 1', tags: ['cute', 'funny'] });
  await tagTable.set('a2', { title: 'Post 2', tags: ['serious'] });
  await tagTable.set('a3', { title: 'Post 3', tags: ['cute', 'deep'] });
  console.table(await tagTable.getAll());

  console.log('\n🔖 \x1b[34mSearch: has tag "cute"\x1b[0m\n');
  console.table(
    await tagTable.search({
      tagsQ: { column: 'tags', include: ['cute'] },
    }),
  );

  console.log('\n🧠 \x1b[34mAdvanced Tag Search: cute AND not serious\x1b[0m\n');
  console.table(
    await tagTable.search({
      tagsQ: { column: 'tags', include: ['cute', '!serious'] },
    }),
  );

  console.log('\n⚡ \x1b[35mBoosted Tag Search (cute *2, deep *3)\x1b[0m\n');
  console.table(
    await tagTable.search({
      select: {
        boost: {
          alias: 'p',
          value: [
            { columns: ['tags'], value: 'deep', weight: 3 },
            { columns: ['tags'], value: 'cute', weight: 2 },
          ],
        },
      },
      tagsQ: { column: 'tags', include: ['cute', 'deep'] },
    }),
  );

  console.log('\n✅ \x1b[1;32mAll tag tests done.\x1b[0m');
  console.log('\n🎉 \x1b[1;32mDone. Everything looks delicious! 🍮\x1b[0m\n');
})();
