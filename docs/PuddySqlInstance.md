# 🗃️ `PuddySqlInstance` Class

Extends [`PuddySqlEngine`](./PuddySqlEngine.mjs) to provide high-level SQL operations with table management, debug logging, and support for both **SQLite3** and **PostgreSQL**.

---

## 🧠 Constructor

```js
new PuddySqlInstance()
```

Initializes the instance and sets up internal properties.

---

## 🔧 Internal Properties

* `#db`: The internal database instance (`sqlite` or `pg.Pool`).
* `#tables`: A record of initialized tables using `PuddySqlQuery`.
* `#debug`: Whether debug logging is enabled.
* `#debugCount`: Number of debug calls (optional use).
* `#consoleColors`: Whether debug console output uses colors.

---

## 🎨 Debug Configuration

### 🎛️ `setConsoleColors(state: boolean): void`

Enable or disable ANSI colors in debug output.

### ✅ `getConsoleColors(): boolean`

Returns whether color output is enabled.

---

## 🖌️ SQL Formatting (for Debug Output)

### 📜 `debugSql(value: string): string`

Formats a SQL string with indentation and ANSI color codes for better console readability.

* Adds line breaks and highlights clauses like `SELECT`, `WHERE`, `JOIN`, `LIMIT`, etc.
* Wraps in decorative box with ANSI colors.

### 🧾 `debugConsoleText(id: string | number, debugName?: string, status?: string): string`

Formats a debug console message with styled tags like:

```txt
[SQL][123] [DEBUG] [MyQuery] [OK]
```

---

## 🐞 Debug Mode

### 🔛 `setIsDebug(isDebug: boolean): void`

Turns debug logging on or off.

### 🔍 `isDebug(): boolean`

Returns `true` if debug mode is enabled.

---

## 📦 Table Management

### 🆕 `initTable(settings?: TableSettings, tableData?: SqlTableConfig): Promise<PuddySqlQuery>`

Initializes a new table if it hasn't already been created.

* Throws if the table already exists.
* Internally creates a `PuddySqlQuery` instance and assigns settings/data.

### 🔍 `getTable(tableName: string): PuddySqlQuery`

Returns the existing table instance for a given name.

* Throws if table does not exist.

### ❓ `hasTable(tableName: string): boolean`

Checks if a table has been initialized.

### 🗑️ `removeTable(tableName: string): void`

Removes a table from the internal map without affecting the actual DB.

* Throws if the table does not exist.

### 💣 `dropTable(tableName: string): Promise<void>`

Drops the table from the database schema, then removes it internally.

* Uses the `dropTable()` method of the `PuddySqlQuery` class.

---

## 🔍 Database Access

### 💾 `getDb(): SqliteDb | PgPool`

Returns the internal database connection instance.

* Useful for advanced custom queries.
* Throws if the DB has not been initialized.

---

## 🔌 Connection & Engine Initialization

### ✅ `isDbOpen(): Promise<boolean>`

Checks if the database connection is open by running a test query (`SELECT 1`).

---

### 🐿️ `initSqlite3(filePath?: string = ':memory:'): Promise<void>`

Initializes a SQLite3 database connection (requires SQLite ≥ 3.35.0).

* Automatically sets the SQL engine to `"sqlite3"`.
* Adds graceful shutdown logic (e.g., on `SIGINT`).

---

### 🧩 `setSqlite3(db: SqliteDb): void`

Sets SQLite3-specific methods (`all`, `get`, `run`) using the provided DB instance.

Each method includes:

* SQL validation and parameter checking;
* Colorized debug output (if enabled);
* Safe error catching and optional `connection-error` event emission.

---

### 🐘 `initPostgre(config: Pg.PoolConfig): Promise<void>`

Initializes a PostgreSQL client using the provided configuration.

* Automatically connects the pool.
* Sets the SQL engine to `"postgre"`.

---

### 🔄 `setPostgre(db: Pg.Pool): void`

Sets PostgreSQL-specific methods (`all`, `get`, `run`) using a PostgreSQL Pool.

* Includes debug output;
* Connection error handling via event emitter;
* Uses `pg`'s async `query()` method for operations.

---

## 🔧 SQL Operation Overrides

All three methods below are overridden dynamically depending on the SQL engine used:

### 📚 `all(query: string, params?: any[], debugName?: string): Promise<Object[] | null>`

Executes a query expected to return multiple rows.

---

### 🧍 `get(query: string, params?: any[], debugName?: string): Promise<Object | null>`

Executes a query expected to return a single row.

---

### ✍️ `run(query: string, params: any[], debugName?: string): Promise<Object | null>`

Executes a query that modifies data (e.g., `INSERT`, `UPDATE`, `DELETE`).

---

## 🧹 Cleanup

### ❌ `destroy(): Promise<void>`

Gracefully shuts down the current instance:

* Removes all event listeners;
* Properly closes the DB connection depending on the SQL engine (`sqlite3` or `postgre`);
* Errors on disconnection are caught and logged.
