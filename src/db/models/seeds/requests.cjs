/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  await knex("requests").insert([
    {
      _id: "00000000-0000-0000-0000-000000000000",
      urgency_id: "00000000-0000-0000-0000-000000000000",
      cabinet_id: "00000000-0000-0000-0000-000000000000",
      technician_id: "00000000-0000-0000-0000-000000000000",
      performed_works: knex.raw("ARRAY ['1', '2']"),
      client: "Буйновский Михаил",
      client_phone: "(33) 123-12-12",
      defects: "i'm dying",
      defect_description: "help me",
      created_at: knex.fn.now(6),
      done_at: knex.fn.now(6)
    }
  ]);
};
