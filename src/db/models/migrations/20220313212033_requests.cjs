/* eslint-disable implicit-arrow-linebreak */
exports.up = (knex) =>
  knex.schema
    .createTable("requests", (table) => {
      table.uuid("_id").defaultTo(knex.raw("gen_random_uuid()")).notNullable();
      table.uuid("urgency_id").notNullable().defaultTo(knex.raw("uuid_nil()"));
      table.uuid("cabinet_id").notNullable().defaultTo(knex.raw("uuid_nil()"));
      table.uuid("technician_id");
      table.specificType("performed_works", "text[]");
      table.string("client", 64).notNullable();
      table.string("client_phone", 14);
      table.string("defects").notNullable();
      table.string("defect_description");
      table.timestamp("created_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
      table.timestamp("done_at", { precision: 6 });

      table.primary("_id");
      table
        .foreign("cabinet_id")
        .references("cabinets._id")
        .onDelete("SET DEFAULT")
        .onUpdate("CASCADE");
      table
        .foreign("urgency_id")
        .references("urgency._id")
        .onDelete("SET DEFAULT")
        .onUpdate("CASCADE");
      table
        .foreign("technician_id")
        .references("technicians._id")
        .onDelete("SET NULL")
        .onUpdate("CASCADE");
    })
    .raw(
      `
    CREATE TRIGGER watched_table_trigger AFTER INSERT ON requests
    FOR EACH ROW EXECUTE PROCEDURE notify_trigger();
  `
    )
    .createView("view_requests", (view) => {
      view.as(
        knex.raw(`
          SELECT 
          requests._id,
          CASE
            WHEN requests.technician_id IS NOT NULL THEN '6:completed'
            WHEN (urgency._interval + created_at - NOW()) < interval '0 hours' THEN '1:expired'
            WHEN (urgency._interval + created_at - NOW()) <= interval '1 hour' THEN '2:hour'
            WHEN (urgency._interval + created_at - NOW()) <= interval '24 hours' THEN '3:day'
            WHEN (urgency._interval + created_at - NOW()) <= interval '168 hours' THEN '4:week'
            WHEN (urgency._interval + created_at - NOW()) > interval '168 hours' THEN '5:none'
          END status,
          cabinets._field AS cabinet, technicians._field AS technician,
          requests.cabinet_id, requests.technician_id,
          requests.performed_works, requests.client, requests.client_phone, 
          requests.defects, requests.defect_description, requests.created_at, requests.done_at
        FROM requests
        JOIN urgency ON (requests.urgency_id = urgency._id)
        JOIN cabinets ON (requests.cabinet_id = cabinets._id)
        LEFT JOIN technicians ON (requests.technician_id = technicians._id)
      `)
      );
    });

exports.down = (knex) => knex.schema.dropView("view_requests").dropTableIfExists("requests");
