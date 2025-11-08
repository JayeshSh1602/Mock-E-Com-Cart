import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { randomUUID } from 'crypto';

const dbPromise = open({
  filename: './data.db',
  driver: sqlite3.Database
});

export async function init() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT,
      price REAL,
      description TEXT
    );
  `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS cart (
      id TEXT PRIMARY KEY,
      productId TEXT,
      qty INTEGER
    );
  `);
  console.log('✅ SQLite DB initialized');
}

export const db = {
  async get(sql, params = []) {
    const d = await dbPromise;
    return d.get(sql, params);
  },
  async all(sql, params = []) {
    const d = await dbPromise;
    return d.all(sql, params);
  },
  async run(sql, params = []) {
    const d = await dbPromise;
    return d.run(sql, params);
  },
};
