// 🧪 PuddySQL Test Playground
// ---------------------------
// This test script initializes a SQLite3 database in memory,
// creates a small test table, and runs various queries to demonstrate functionality.

// import path from 'path';
// import { fileURLToPath } from 'url';
import PuddySql from '../dist/index.mjs';

// 🌐 Path Setup
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

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
  const allItems = await table.getAll();
  console.table(allItems);

  // 🔍 Find by ID
  console.log('\n🔍 Getting record with ID = 1\n');
  const oneItem = await table.get('1');
  console.dir(oneItem);

  // 🔁 Update an Entry
  console.log('\n📝 Updating ID = 4 (yay = true)\n');
  await table.set('4', { yay: true });
  const updated = await table.get('4');
  console.dir(updated);

  console.log('\n📝 Updating ID = 4 (yay = false)\n');
  await table.set('4', { yay: false });
  const updated2 = await table.get('4');
  console.dir(updated2);

  // ❌ Delete an Entry
  console.log('\n🗑️ Deleting ID = 2\n');
  await table.delete('2');
  const afterDelete = await table.getAll();
  console.table(afterDelete);

  // 🔎 Advanced Search: prompt = pudding
  console.log('\n🔎 Search: prompt = pudding\n');
  const search1 = await table.search({
    q: {
      group: 'AND',
      conditions: [{ column: 'prompt', value: '🍮 pudding' }],
    },
  });
  console.dir(search1);

  // 🔎 OR Search: prompt = pudding OR yay = false
  console.log('\n🔎 OR Search: pudding or yay = false\n');
  const search2 = await table.search({
    q: {
      group: 'OR',
      conditions: [
        { column: 'prompt', value: '🍮 pudding' },
        { column: 'yay', value: false },
      ],
    },
  });
  console.dir(search2);

  // 📚 Paginated Search
  console.log('\n📚 Paginated Search (2 per page)\n');
  const paged = await table.search({
    q: {},
    perPage: 2,
    page: 1,
    order: 'id ASC',
  });
  console.table(paged.items);

  console.log('\n📚 Paginated Search (Page 2)\n');
  const paged2 = await table.search({
    q: {},
    perPage: 2,
    page: 2,
    order: 'id ASC',
  });
  console.table(paged2.items);
  console.table(paged2);

  // 📌 Get amount (first 3)
  console.log('\n📌 Getting first 3 records\n');
  const few = await table.getAmount(3);
  console.table(few);

  // 🧹 Advanced delete: delete all yay = false
  console.log('\n🧹 Deleting all yay = false...\n');
  const deleted = await table.advancedDelete({
    yay: { value: false },
  });
  console.log(`Deleted rows: ${deleted}`);

  // 🧾 Final state
  console.log('\n🧾 Final Records:\n');
  const final = await table.getAll();
  console.table(final);

  console.log('\n✅ Done.\n');
})();
