import pg from "pg";

const connect = {
  connectionString: process.env.DATABASE_URL
};

if (process.env.NODE_ENV === "production") {
  connect.ssl = {
    rejectUnauthorized: false
  };
}

const pool = new pg.Pool(connect);

export default pool;
