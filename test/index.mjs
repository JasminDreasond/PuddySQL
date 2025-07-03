// 🧪 PuddySQL Test Playground
// ---------------------------
// This test script initializes a SQLite3 database in memory,
// creates a small test table, and runs various queries to demonstrate functionality.

import stringify from 'safe-stable-stringify';
import { ColorSafeStringify } from 'tiny-essentials';
import PuddySql from '../dist/index.mjs';

const colorJsonSafe = new ColorSafeStringify();
const colorSafeStringify = (json, space = 0) =>
  colorJsonSafe.colorize(stringify(json, null, space));

// 🚀 Create SQL Engine Instance
const db = new PuddySql.Instance();

(async () => {
  console.log('\n🔧 Initializing SQLite3...\n');
  await db.initSqlite3();

  // 🧱 Define table schema
  const table = await db.initTable({ name: 'tinytest', id: 'id', order: 'id ASC' }, [
    ['id', 'TEXT', 'PRIMARY KEY'],
    ['prompt', 'TEXT'],
    ['yay', 'BOOLEAN'],
  ]);

  // 📦 Inserting Data
  console.log('\n📥 Inserting test data...\n');
  const insertResults = await Promise.all([
    table.set('1', { prompt: '🍮 pudding', yay: true }),
    table.set('2', { prompt: '🍪 cookie', yay: true }),
    table.set('3', { prompt: '🍫 brigadeiro', yay: true }),
    table.set('4', { prompt: '🍌 banana', yay: false }),
    table.set('5', { prompt: '🍫 chocolate', yay: true }),
  ]);
  console.table(insertResults);

  // 📤 Fetching All Records
  console.log('\n📃 All Records:\n');
  console.table(await table.getAll());

  // 🔍 Find by ID
  console.log('\n🔍 Getting record with ID = 1\n');
  console.log(colorSafeStringify(await table.get('1')));

  // 🔁 Update an Entry
  console.log('\n📝 Updating ID = 4 (yay = true)\n');
  await table.set('4', { yay: true });
  console.log(colorSafeStringify(await table.get('4')));

  console.log('\n📝 Updating ID = 4 (yay = false)\n');
  await table.set('4', { yay: false });
  console.log(colorSafeStringify(await table.get('4')));

  // ❌ Delete an Entry
  console.log('\n🗑️ Deleting ID = 2\n');
  await table.delete('2');
  console.table(await table.getAll());

  // 🔎 Advanced Search: prompt = pudding
  console.log('\n🔎 Search: prompt = pudding\n');
  console.log(
    colorSafeStringify(
      await table.search({
        q: {
          group: 'AND',
          conditions: [{ column: 'prompt', value: '🍮 pudding' }],
        },
      }),
      1,
    ),
  );

  // 🔎 OR Search: prompt = pudding OR yay = false
  console.log('\n🔎 OR Search: pudding or yay = false\n');
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

  // 📚 Paginated Search
  console.log('\n📚 Paginated Search (2 per page)\n');
  const page1 = await table.search({ q: {}, perPage: 2, page: 1, order: 'id ASC' });
  console.table(page1.items);

  console.log('\n📚 Paginated Search (Page 2)\n');
  const page2 = await table.search({ q: {}, perPage: 2, page: 2, order: 'id ASC' });
  console.table(page2.items);
  console.table({ totalPages: page2.totalPages, totalItems: page2.totalItems });

  // 📌 Get amount (first 3)
  console.log('\n📌 Getting first 3 records\n');
  console.table(await table.getAmount(3));

  // 🧹 Advanced delete: delete all yay = false
  console.log('\n🧹 Deleting all yay = false...\n');
  const deleted = await table.advancedDelete({ yay: { value: false } });
  console.log(`Deleted rows: ${deleted}`);

  // 🧾 Final state
  console.log('\n🧾 Final Records:\n');
  console.table(await table.getAll());

  // 🏷️ Tags System Tests
  console.log('\n🏷️ Creating tagged_posts table...\n');
  const tagTable = await db.initTable({ name: 'tagged_posts', id: 'id' }, [
    ['id', 'TEXT', 'PRIMARY KEY'],
    ['title', 'TEXT'],
    ['tags', 'TAGS'],
  ]);

  const tagManager = tagTable.getTagEditor('tags');

  await tagTable.set('a1', { title: 'Post 1', tags: ['cute', 'funny'] });
  await tagTable.set('a2', { title: 'Post 2', tags: ['serious'] });
  await tagTable.set('a3', { title: 'Post 3', tags: ['cute', 'deep'] });
  const tagItems = await tagTable.getAll();
  console.table(tagItems);

  console.log('\n🔖 Search: has tag "cute"\n');
  console.table(
    await tagTable.search({
      tagsQ: { column: 'tags', include: ['cute'] },
    }),
  );

  console.log('\n🧠 Advanced Tag Search: cute AND not serious\n');
  console.table(
    await tagTable.search({
      tagsQ: { column: 'tags', include: ['cute', '!serious'] }
    }),
  );

  console.log('\n⚡ Boosted Tag Search (cute *2, deep *3)\n');
  console.table(
    await tagTable.search({
      select: {
        boost: {
          alias: 'p',
          value: [
          { columns: ['tags'], value: 'deep', weight: 3 },
          { columns: ['tags'], value: 'cute', weight: 2 },
        ]
        }
      },
      tagsQ: { 
        column: 'tags', 
        include: ['cute', 'deep'],
      },
    }),
  );

  console.log('\n✅ All tag tests done.\n');
  console.log('\n✅ Done.\n');
})();
