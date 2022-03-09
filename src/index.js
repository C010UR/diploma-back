#!/usr/bin/env/node
import log4js from "log4js";
import app from "./app.js";

const logger = log4js.getLogger("server");

const port = process.env.PORT;

try {
  const server = app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
  });
  process.on("SIGTERM", () => {
    logger.warn("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      logger.info("HTTP server closed");
    });
  });
} catch (error) {
  logger.error(error);
  process.exit(1);
}
