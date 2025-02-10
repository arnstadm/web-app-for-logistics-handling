// Proper way to initialize and share the Database object
// Loading and initializing the library:
const pgp = require("pg-promise")({
  // Initialization Options
});
// Preparing the connection details:
const cn = {
  host: "database-1.cssplrxhvejr.eu-north-1.rds.amazonaws.com",
  port: 5432,
  database: "data",
  user: "postgres",
  password: "gyvmVrHn3ZVHk0Gb8EGZ"
};
// Creating a new database instance from the connection details:
const db = pgp(cn);
// Exporting the database object for shared use:
module.exports = db;
