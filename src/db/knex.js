import knex from "knex";
import { attachPaginate } from "knex-paginate";

const instance = knex({
  client: "pg",
  connection: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
  },
  pool: { min: 0, max: 20 }
});

attachPaginate();

export default instance;
