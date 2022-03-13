/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("administrators").insert([{ _login: "test", _pass: "test" }]);
};
