/* eslint-disable implicit-arrow-linebreak */
exports.up = (knex) =>
  knex.schema.createTable("administrators", (table) => {
    table.uuid("_id").defaultTo(knex.raw("gen_random_uuid()")).notNullable();
    table.string("_login", 32).notNullable();
    table.string("_pass", 60).notNullable();
    table.timestamp("created_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
    table.primary("_id");
    table.unique("_login");
  });

exports.down = (knex) => knex.schema.dropTableIfExists("administrators");
