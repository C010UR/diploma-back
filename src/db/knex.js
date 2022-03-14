import knex from "knex";
import { attachPaginate } from "knex-paginate";
import config from "../../knexfile.js";

const instance = knex(config[process.env.NODE_ENV]);

attachPaginate();

export default instance;
