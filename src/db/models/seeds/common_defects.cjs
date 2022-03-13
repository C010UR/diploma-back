/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("common_defects").insert([
    { _field: "Не работает интернет" },
    { _field: "Не работает мышь" },
    { _field: "Не работает клавиатура" },
    { _field: "Не работает компьютер" },
    { _field: "Не работает 1С" },
    { _field: "Не работает принтер" },
    { _field: "Нету звука" }
  ]);
};
