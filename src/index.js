#!/usr/bin/env/node

import { server as app } from "./app.js";
import log from "./logging.js";

const port = process.env.PORT;

try {
  const server = app.listen(port, () => {
    log("host", "server starting", `Listening on port ${port}`);
  });
  process.on("SIGTERM", () => {
    log("host", "server closing", "SIGTERM signal received: closing HTTP server");
    server.close(() => {
      log("host", "server closed", "HTTP server closed");
    });
  });
} catch (error) {
  log("host", "server", error, true);
  process.exit(1);
}
