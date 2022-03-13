/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("technicians").insert([
    { _field: "Иванов Иван Иванович" },
    { _field: "Петров Петр Петрович" }
  ]);
};
