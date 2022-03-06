import knex from "knex";
import { attachPaginate } from "knex-paginate";

const instance = knex({
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 20 }
});

attachPaginate();

export default instance;
