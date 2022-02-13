// Node default
import path from "path";
// Express
import express from "express";
// Other middleware
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import favicon from "serve-favicon";
// Process requests
import bodyParser from "body-parser";
import multer from "multer";
// Session
import session from "express-session";
import pgSession from "connect-pg-simple";
// Local modules
import mountRoutes from "./routers/index.js";
import pgPool from "./db/pool.js";

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();

// Initializing
const upload = multer();
const PgSession = pgSession(session);
const app = express();

// Middleware
app.use("/static", express.static(path.join(__dirname, "./public")));
app.use(favicon(path.join(__dirname, "./public/favicon.ico")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(morgan("[:date[iso]] client: :remote-addr\nHTTP - :remote-user :method :url HTTP/:http-version :status :res[content-length]\n"));
app.use(helmet());
app.use(compression());
app.use(
  session({
    store: new PgSession({
      pool: pgPool
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2592000000 } // 30 days
  })
);

mountRoutes(app);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./templates/views"));

export default app;
