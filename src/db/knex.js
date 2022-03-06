import knex from "knex";
import { attachPaginate } from "knex-paginate";
import { parse } from "pg-connection-string";

const pgconfig = parse(process.env.DATABASE_URL);

pgconfig.ssl = { rejectUnauthorized: false };

const instance = knex({
  client: "pg",
  connection: pgconfig,
  pool: { min: 0, max: 20 }
});

attachPaginate();

export default instance;
