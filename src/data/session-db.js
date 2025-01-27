import { Database } from "bun:sqlite";

export default class SessionDatabase {
  static database = new Database(
    `${process.cwd()}/data/session.sqlite`, 
    { create: true, strict: true }
  );

  static {
    this.database.run("CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, iv TEXT NOT NULL, authTag TEXT NOT NULL)");
  }

  static create(session) {
    const query = this.database.query("INSERT INTO sessions (id, iv, authTag) VALUES ($id, $iv, $authTag)");
    
    query.run(session);
    query.finalize();
  }

  static read(id) {
    const query = this.database.query("SELECT * FROM sessions WHERE id = $id");
    
    return query.get({ id });
  }

  static delete(id) {
    const query = this.database.query(`DELETE FROM sessions${id ? " WHERE id = $id" : ""}`);
  
    query.run({ id });
    query.finalize();
  }
}
