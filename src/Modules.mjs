import * as sqlite3Module from 'sqlite3';
import * as pgModule from 'pg';

/** @type {import('pg')} */
// @ts-ignore
export const pg = pgModule.default || pgModule;

/** @type {import('sqlite3')} */
// @ts-ignore
export const sqlite3 = sqlite3Module.default || sqlite3Module;
