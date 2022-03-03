import path from "path";
// Server
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
// Middleware
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
// Process requests
import bodyParser from "body-parser";
import multer from "multer";
// Session
import session from "express-session";
import pgSession from "connect-pg-simple";
// Local modules
import mountRoutes from "./routers/index.js";
import { log, dateToStr } from "./log.js";
import pool from "./db/pool.js";

const __dirname = path.resolve();

// Initializing
const upload = multer();
const app = express();
const server = createServer(app);

export default server;

const PgSession = pgSession(session);

const sessionMiddleware = session({
  store: new PgSession({ pool }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 2592000000 } // 30 days
});

morgan.token("time", () => dateToStr(new Date()));

const middleware = [
  morgan(
    "[:time] Address - :remote-addr | HTTP\n:remote-user :method :url HTTP/:http-version :status :res[content-length]\n"
  ),
  express.json(),
  bodyParser.urlencoded({ extended: true }),
  upload.array(),
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
app.use("/public", express.static(path.join(__dirname, "./public/")));
mountRoutes(app);

const io = new Server(server, {});

// Socket.IO
io.use((socket, next) => sessionMiddleware(socket.request, {}, next));
io.on("connection", (socket) => {
  // On Connection set up the listeners
  log(socket.handshake.address, "Socket.IO", `User ${socket.id} connected`);
  socket.on("disconnect", () => {
    log(socket.handshake.address, "Socket.IO", `User ${socket.id} disconnected`);
  });

  if (socket.request.session.isAuth) {
    socket.join("dashboard");
  } else {
    socket.disconnect();
  }
});

pool.connect((error, client) => {
  if (error) {
    log("pool", "sql", error, true);
  }
  client.on("notification", (msg) => {
    io.to("dashboard").emit("row:new", msg.payload);
  });
  return client.query("LISTEN watchers");
});
