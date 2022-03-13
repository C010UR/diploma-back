/* eslint-disable implicit-arrow-linebreak */
exports.up = (knex) =>
  knex.schema.createTable("urgency", (table) => {
    table.uuid("_id").defaultTo(knex.raw("gen_random_uuid()")).notNullable();
    table.string("_field", 32).notNullable();
    table.specificType("_interval", "interval").notNullable();
    table.primary("_id");
  });

exports.down = (knex) => knex.schema.dropTableIfExists("urgency");
