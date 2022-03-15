/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("administrators").del();
  await knex("requests").del();
  async function insertNil(table, hasInterval) {
    await knex(table).del();
    await knex.raw(`
      INSERT INTO ${table} (_id, _field${hasInterval ? ", _interval" : ""})
      VALUES (uuid_nil(), '[Удалено]'${hasInterval ? ", '0 seconds'" : ""});
    `);
  }
  await insertNil("cabinets");
  await insertNil("urgency", true);
  await insertNil("common_defects");
  await insertNil("technicians");
  await insertNil("common_works");
};
