/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("administrators").insert([
    { _login: "test", _pass: "$2y$08$I.NoJe8kuNKgfbISES5jPuy6KmJcU16qk4X4OJaklv3KY1/wDM5Cu" }
  ]);
};
