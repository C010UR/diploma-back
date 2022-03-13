/* eslint-disable implicit-arrow-linebreak */
exports.up = (knex) =>
  knex.schema.createTable("common_defects", (table) => {
    table.uuid("_id").defaultTo(knex.raw("gen_random_uuid()")).notNullable();
    table.string("_field", 64).notNullable();
    table.primary("_id");
  });

exports.down = (knex) => knex.schema.dropTableIfExists("common_defects");
