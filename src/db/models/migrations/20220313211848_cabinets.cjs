/* eslint-disable implicit-arrow-linebreak */
exports.up = (knex) =>
  knex.schema.createTable("cabinets", (table) => {
    table.uuid("_id").defaultTo(knex.raw("gen_random_uuid()")).notNullable();
    table.string("_field", 32).notNullable();
    table.primary("_id");
  });

exports.down = (knex) => knex.schema.dropTableIfExists("cabinets");
