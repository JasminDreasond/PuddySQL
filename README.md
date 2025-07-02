<div align="center">
<p>
    <a href="https://discord.gg/TgHdvJd"><img src="https://img.shields.io/discord/413193536188579841?color=7289da&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/puddysql"><img src="https://img.shields.io/npm/v/puddysql.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/puddysql"><img src="https://img.shields.io/npm/dt/puddysql.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://www.patreon.com/JasminDreasond"><img src="https://img.shields.io/badge/donate-patreon-F96854.svg?logo=patreon" alt="Patreon" /></a>
    <a href="https://ko-fi.com/jasmindreasond"><img src="https://img.shields.io/badge/donate-ko%20fi-29ABE0.svg?logo=ko-fi" alt="Ko-Fi" /></a>
</p>
<p>
    <a href="https://nodei.co/npm/puddysql/"><img src="https://nodei.co/npm/puddysql.png?downloads=true&stars=true" alt="npm installnfo" /></a>
</p>
</div>

# 🐾 PuddySQL

**PuddySQL** is a modular and extensible SQL toolkit for Node.js — designed to make dynamic queries, filters, pagination, and tag-based searches easy, safe, and powerful.

Built with composability in mind, each part of PuddySQL focuses on one job while integrating smoothly with the others. Whether you're working with SQLite or PostgreSQL, this package helps you build robust, readable, and scalable query logic.

---

## 📦 Installation

```bash
npm install puddysql
```

---

## 🧱 Main Features

* ✅ Safe, composable SQL queries with named methods
* 🔍 Powerful nested filters using JSON logic (AND/OR, operators, etc.)
* 🏷️ Built-in tag filtering engine for JSON/array-based fields
* 🔗 Dynamic JOIN builder with alias support
* 📃 Smart pagination with automatic counters
* 🧪 Strong input validation and type safety

---

## 📚 Documentation

To learn more about each module (`Engine`, `Instance`, `Query`, `Tags`) and how they work together:

👉 **See:** [`docs/README.md`](./docs/README.md)

---

## 🔧 Module Overview

| Module             | Description                                 |
| ------------------ | ------------------------------------------- |
| `PuddySqlEngine`   | Low-level query runner with DB abstraction  |
| `PuddySqlInstance` | Manages databases and table bindings        |
| `PuddySqlQuery`    | High-level querying with filters and joins  |
| `PuddySqlTags`     | Parses tag filters into safe SQL conditions |

---

## 🧪 Requirements

* Node.js 18+ recommended
* Works with:

  * ✅ SQLite3
  * ✅ PostgreSQL (via `pg` adapter)

---

## 🤝 Contributions

Feel free to fork, contribute, and create pull requests for improvements! Whether it's a bug fix or an additional feature, contributions are always welcome.

## 📝 License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

> 🧠 **Note**: This documentation was written by [ChatGPT](https://openai.com/chatgpt), an AI assistant developed by OpenAI, based on the project structure and descriptions provided by the repository author.  
> If you find any inaccuracies or need improvements, feel free to contribute or open an issue!