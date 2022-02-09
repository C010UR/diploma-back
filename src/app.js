import express from "express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import mountRoutes from "./routers/index.js";

const app = express();

// Middleware
app.use(express.json());
app.use(
  morgan(
    "[:date[iso]] HTTP :remote-addr - :remote-user :method :url HTTP/:http-version :status :res[content-length]"
  )
);
app.use(helmet());
app.use(compression());
app.use(mountRoutes);

export default app;
