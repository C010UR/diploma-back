import pg from "pg";

const connect = {
  connectionString: `${process.env.DATABASE_URL}${process.env.NODE_ENV === "test" ? "-test" : ""}`
};

if (process.env.NODE_ENV === "production") {
  connect.ssl = {
    rejectUnauthorized: false
  };
}

const pool = new pg.Pool(connect);

export default pool;
