#!/usr/bin/env/node
import log4js from "log4js";
import app from "./app.js";
import { bot } from "./routers/viber.js";

const logger = log4js.getLogger("server");

const port = process.env.PORT;

process.on("unhandledRejection", (reason, p) => {
  logger.error("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

try {
  const server = app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
    bot.setWebhook(process.env.EXPOSE_URL + process.env.VIBER_WEBHOOK);
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
