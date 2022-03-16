import { join, resolve } from "path";

const __dirname = resolve();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: "postgresql",
    connection: {
      connectionString: process.env.DATABASE_URL
    },
    migrations: {
      directory: join(__dirname, "./src/db/models/migrations")
    },
    seeds: {
      directory: join(__dirname, "./src/db/models/seeds")
    }
  },
  test: {
    client: "postgresql",
    connection: {
      connectionString: `${process.env.DATABASE_URL}-test`
    },
    migrations: {
      directory: join(__dirname, "./src/db/models/migrations")
    },
    seeds: {
      directory: join(__dirname, "./src/db/models/seeds")
    }
  },
  production: {
    client: "postgresql",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: join(__dirname, "./src/db/models/migrations")
    },
    seeds: {
      directory: join(__dirname, "./src/db/models/seeds")
    }
  }
};
