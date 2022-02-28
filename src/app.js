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
// Local modules
// import/no-cycle because request.js uses socket.io emit
// eslint-disable-next-line import/no-cycle
import mountRoutes from "./routers/index.js";
import sessionMiddleware from "./middleware/sessionMiddleware.js";
import log from "./logging.js";

const __dirname = path.resolve();

// Initializing
const upload = multer();
const app = express();
const server = createServer(app);

const middleware = [
  morgan(
    "[:date[iso]] client: :remote-addr\nHTTP - :remote-user :method :url HTTP/:http-version :status :res[content-length]\n"
  ),
  express.json(),
  bodyParser.urlencoded({ extended: true }),
  upload.array(),
  helmet(),
  compression(),
  sessionMiddleware,
  cors({ allowedHeaders: "Content-Type, Cache-Control" })
];

app.use("/public", express.static(path.join(__dirname, "./public/")));
app.use(middleware);

mountRoutes(app);

const io = new Server(server, {});

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

export { server, io };
