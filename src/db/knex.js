import knex from "knex";
import { attachPaginate } from "knex-paginate";
import pgConString from "pg-connection-string";

const pgconfig = pgConString.parse(process.env.DATABASE_URL);

if (process.env.NODE_ENV === "production") {
  pgconfig.ssl = { rejectUnauthorized: false };
}

const instance = knex({
  client: "pg",
  connection: pgconfig,
  pool: { min: 0, max: 20 }
});

attachPaginate();

export default instance;
