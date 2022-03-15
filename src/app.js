import path from "path";
// Server
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
// Middleware
import log4js from "log4js";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
// Process requests
import bodyParser from "body-parser";
// Session
import session from "express-session";
import knexSession from "connect-session-knex";
// Local modules
import mountRoutes from "./routers/index.js";
import knex from "./db/knex.js";
import pool from "./db/pool.js";

const __dirname = path.resolve();

// Initializing
const app = express();
const server = createServer(app);
log4js.configure({
  appenders: {
    console: { type: "console" }
  },
  categories: {
    default: { appenders: ["console"], level: "info" }
  }
});
const socketLogger = log4js.getLogger("socket.io");
const pgLogger = log4js.getLogger("pg");

export default server;

const KnexStore = knexSession(session);

const sessionMiddleware = session({
  store: new KnexStore({ knex }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 2592000000 } // 30 days
});

if (process.env.NODE_ENV !== "test") {
  const httpLogFormat = "[:remote-addr] :status :method :url HTTP/:http-version (:response-timems)";
  app.use(
    log4js.connectLogger(log4js.getLogger("http"), {
      level: "auto",
      format: httpLogFormat
    })
  );
}
const middleware = [
  express.json(),
  bodyParser.urlencoded({ extended: true }),
  helmet(),
  compression(),
  sessionMiddleware,
  cors({
    origin: true,
    allowedHeaders: "Content-Type, Cache-Control",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
  })
];
app.use(middleware);
app.use("/", express.static(path.join(__dirname, "./public/")));
mountRoutes(app);

const io = new Server(server, {});

// Socket.IO
io.use((socket, next) => sessionMiddleware(socket.request, {}, next));
io.on("connection", (socket) => {
  // On Connection set up the listeners
  socketLogger.info(`[${socket.handshake.address}] User ${socket.id} connected`);
  socket.on("disconnect", () => {
    socketLogger.info(`[${socket.handshake.address}] User ${socket.id} disconnected`);
  });

  if (socket.request.session.isAuth) {
    socket.join("dashboard");
  } else {
    socket.disconnect();
  }
});

pool.connect((error, client) => {
  if (error) {
    pgLogger.error(error);
  }
  client.on("notification", (msg) => {
    io.to("dashboard").emit("row:new", msg.payload);
  });
  return client.query("LISTEN watchers");
});
