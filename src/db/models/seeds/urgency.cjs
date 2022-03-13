/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("urgency").insert([
    { _field: "В течение часа", _interval: "1 hour" },
    { _field: "В течение дня", _interval: "1 day" },
    { _field: "В течение недели", _interval: "1 week" },
    { _field: "В течение месяца", _interval: "1 month" },
    { _field: "Не указано", _interval: "10 years" }
  ]);
};
