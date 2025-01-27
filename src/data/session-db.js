import { Database } from "bun:sqlite";

const database = new Database(
  `${process.cwd()}/data/session-db.sqlite`, 
  { create: true, strict: true }
);

database.run("CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, iv TEXT NOT NULL, authTag TEXT NOT NULL)");

export function insertSession(session) {
  const query = database.query("INSERT INTO sessions (id, iv, authTag) VALUES ($id, $iv, $authTag)");
  
  query.run(session);
  query.finalize();
}

export function selectSession(id) {
  const query = database.query("SELECT * FROM sessions WHERE id = $id");
  
  return query.get({ id });
}

export function deleteSession(id) {
  const query = database.query(`DELETE FROM sessions${id ? " WHERE id = $id" : ""}`);

  query.run({ id });
  query.finalize();
}
