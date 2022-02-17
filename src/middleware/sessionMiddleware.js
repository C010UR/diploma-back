import session from "express-session";
import pgSession from "connect-pg-simple";
import pgPool from "../db/pool.js";

const PgSession = pgSession(session);

const sessionMiddleware = session({
  store: new PgSession({
    pool: pgPool
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 2592000000 } // 30 days
});

export default sessionMiddleware;
