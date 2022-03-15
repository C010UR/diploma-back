import Knex from "knex";
import config from "../../knexfile.js";

const knex = Knex(config[process.env.NODE_ENV]);

async function before() {
  await knex.migrate.rollback();
  await knex.migrate.latest();
  await knex.seed.run();
  await knex.destroy();
}

export default before;
