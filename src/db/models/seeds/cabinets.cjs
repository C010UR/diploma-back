/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("cabinets").insert([
    { _field: "Бухгалтерия" },
    { _field: "Преподавательская" },
    { _field: "Библиотека" },
    { _field: "Кабинет 10" },
    { _field: "Кабинет 11" },
    { _field: "Кабинет 12" },
    { _field: "Кабинет 13" },
    { _field: "Кабинет 14" },
    { _field: "Кабинет 15" },
    { _field: "Кабинет 16" },
    { _field: "Кабинет 20" },
    { _field: "Кабинет 21" },
    { _field: "Кабинет 22" },
    { _field: "Кабинет 23" },
    { _field: "Кабинет 24" },
    { _field: "Кабинет 25" },
    { _field: "Кабинет 26" },
    { _field: "Кабинет 27" },
    { _field: "Кабинет 28" },
    { _field: "Кабинет 30" },
    { _field: "Кабинет 31" },
    { _field: "Кабинет 32" },
    { _field: "Кабинет 33" },
    { _field: "Кабинет 34" },
    { _field: "Кабинет 35" },
    { _field: "Кабинет 36" },
    { _field: "Кабинет 37" },
    { _field: "Кабинет 38" },
    { _field: "Кабинет 40" },
    { _field: "Кабинет 41" },
    { _field: "Кабинет 42" },
    { _field: "Кабинет 43" },
    { _field: "Кабинет 44" }
  ]);
};
