import { Database } from "bun:sqlite";

export default class AnalyticsDatabase {
  static database = new Database(
    `${process.cwd()}/data/analytics.sqlite`, 
    { create: true, strict: true }
  );

  static {
    this.database.run("CREATE TABLE IF NOT EXISTS pageViews (id TEXT NOT NULL PRIMARY KEY, ip TEXT NOT NULL, path TEXT NOT NULL, date TEXT NOT NULL)");
    this.database.run("CREATE TABLE IF NOT EXISTS performanceMetrics (id TEXT NOT NULL PRIMARY KEY, path TEXT NOT NULL, name TEXT NOT NULL, rating TEXT NOT NULL, value INTEGER NOT NULL, delta INTEGER NOT NULL, navigationType TEXT NOT NULL)");
  }

  static pageViews = class PageViews {
    static create(pageView) {
      const query = AnalyticsDatabase.database.query("INSERT INTO pageViews (id, ip, path, date) VALUES ($id, $ip, $path, $date)");
    
      query.run(pageView);
      query.finalize();
    }

    static readByDate(lastDays) {
      const partial = "CASE WHEN path LIKE '%knowledge%' THEN substr(path, 1, length('knowledge') + 1) ELSE path END";
      let query;

      if (lastDays == 1) query = AnalyticsDatabase.database.query(`SELECT ${partial} AS path, strftime('%H', date) AS hour, COUNT(*) AS views FROM pageViews WHERE date > datetime('now', '-${lastDays} days', 'subsec') GROUP BY ${partial}, strftime('%H', date) ORDER BY ${partial}, strftime('%H:%M', date)`);
      else if (lastDays == 7) query = AnalyticsDatabase.database.query(`SELECT ${partial} AS path, strftime('%u', date) AS weekday, COUNT(*) AS views FROM pageViews WHERE date > datetime('now', '-${lastDays} days', 'subsec') GROUP BY ${partial}, strftime('%u', date) ORDER BY ${partial}, strftime('%u', date)`);
      else if (lastDays == 365) query = AnalyticsDatabase.database.query(`SELECT ${partial} AS path, strftime('%m', date) AS month, COUNT(*) AS views FROM pageViews WHERE date > datetime('now', '-${lastDays} days', 'subsec') GROUP BY ${partial}, strftime('%m', date) ORDER BY ${partial}, strftime('%m', date)`)
      else query = AnalyticsDatabase.database.query(`SELECT ${partial} AS path, strftime('%d', date) AS day, COUNT(*) AS views FROM pageViews WHERE date > datetime('now', '-${lastDays} days', 'subsec') GROUP BY ${partial}, strftime('%d', date) ORDER BY ${partial}, strftime('%d', date)`);
        
      return query.all();
    }
  };

  static performanceMetrics = class PerformanceMetrics {
    static create(performanceMetric) {
      const query = AnalyticsDatabase.database.query("INSERT INTO performanceMetrics (id, path, name, rating, value, delta, navigationType) VALUES ($id, $path, $name, $rating, $value, $delta, $navigationType)");
    
      query.run(performanceMetric);
      query.finalize();
    }

    static readByRating(name) {
      const partial = "CASE WHEN path LIKE '%knowledge%' THEN substr(path, 1, length('knowledge') + 1) ELSE path END";
      const query = AnalyticsDatabase.database.query(`SELECT ${partial} path, rating, SUM(delta) AS value FROM performanceMetrics WHERE name = '${name}' GROUP BY substr(id, 0, instr(id, '-')), ${partial}, rating ORDER BY ${partial}, rating`);
        
      return query.all();
    }
  };
}
