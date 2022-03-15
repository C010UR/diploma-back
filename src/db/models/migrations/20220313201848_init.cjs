/* eslint-disable implicit-arrow-linebreak */
exports.up = (knex) =>
  // prettier-ignore
  knex.schema
    .raw("SET timezone = 'Europe/Minsk';")
    .raw("CREATE EXTENSION IF NOT EXISTS \"pgcrypto\";")
    .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")
    .raw(`
      CREATE FUNCTION notify_trigger() RETURNS trigger AS $$
      BEGIN
        PERFORM pg_notify('watchers', NEW._id::varchar );
        RETURN new;
      END;
      $$ LANGUAGE plpgsql;
    `);

exports.down = (knex) =>
  // prettier-ignore
  knex.schema
    .raw("DROP FUNCTION IF EXISTS notify_trigger;")
    .raw("DROP EXTENSION IF EXISTS \"pgcrypto\";")
    .raw("DROP EXTENSION IF EXISTS \"uuid-ossp\";");
