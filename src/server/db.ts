// One small SQLite file holds everything the server remembers.
import { mkdirSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

export function openDb(path: string): DatabaseSync {
  const db = new DatabaseSync(path);
  db.exec(`
    CREATE TABLE IF NOT EXISTS rooms (id TEXT PRIMARY KEY, json TEXT NOT NULL, updated INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT UNIQUE NOT NULL, rules TEXT NOT NULL DEFAULT '[]', created INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS codes (email TEXT PRIMARY KEY, hash TEXT NOT NULL, expires INTEGER NOT NULL, tries INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS sessions (hash TEXT PRIMARY KEY, user INTEGER NOT NULL, created INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY, user INTEGER NOT NULL, at INTEGER NOT NULL, score INTEGER NOT NULL, frames INTEGER NOT NULL, mode TEXT NOT NULL, title TEXT NOT NULL);
  `);
  return db;
}
let shared: DatabaseSync | undefined;
export const db = () => {
  if (!shared) { mkdirSync('data', { recursive: true }); shared = openDb('data/split.db'); }
  return shared;
};
