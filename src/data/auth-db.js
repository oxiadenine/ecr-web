import { Database } from "bun:sqlite";

export default class AuthDatabase {
  static database = new Database(
    `${process.cwd()}/data/auth.sqlite`, 
    { create: true, strict: true }
  );

  static {
    this.database.run("CREATE TABLE IF NOT EXISTS sessions (id TEXT BOT NULL PRIMARY KEY, iv TEXT NOT NULL, authTag TEXT NOT NULL)");
  }

  static sessions = class Sessions {
    static create(session) {
      const query = AuthDatabase.database.query("INSERT INTO sessions (id, iv, authTag) VALUES ($id, $iv, $authTag)");
      
      query.run(session);
      query.finalize();
    }
  
    static read(id) {
      const query = AuthDatabase.database.query("SELECT * FROM sessions WHERE id = $id");
      
      return query.get({ id });
    }
  
    static delete(id) {
      const query = AuthDatabase.database.query(`DELETE FROM sessions${id ? " WHERE id = $id" : ""}`);
    
      query.run({ id });
      query.finalize();
    }
  };
}
