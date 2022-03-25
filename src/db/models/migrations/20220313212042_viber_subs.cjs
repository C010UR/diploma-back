/* eslint-disable implicit-arrow-linebreak */
exports.up = (knex) =>
  knex.schema.createTable("viber_subs", (table) => {
    table.string("_id").notNullable();
    table.primary("_id");
  });

exports.down = (knex) => knex.schema.dropTableIfExists("viber_subs");
