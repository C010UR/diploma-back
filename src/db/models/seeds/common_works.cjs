/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("common_works").insert([
    { _field: "Починил мышь" },
    { _field: "Починил клавиатуру" },
    { _field: "Починил компьютер" },
    { _field: "Починил 1С" },
    { _field: "Починил принтер" }
  ]);
};
