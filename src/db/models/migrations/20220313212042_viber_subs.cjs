/* eslint-disable implicit-arrow-linebreak */
exports.up = (knex) =>
  knex.schema.createTable("viber_subs", (table) => {
    table.uuid("_id").defaultTo(knex.raw("gen_random_uuid()")).notNullable();
    table.string("val").notNullable();
    table.primary("_id");
  });

exports.down = (knex) => knex.schema.dropTableIfExists("viber_subs");
