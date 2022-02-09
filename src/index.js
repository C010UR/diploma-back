#!/usr/bin/env/node

/* eslint-disable no-console */
import app from "./app.js";

const port = process.env.PORT;

try {
  const server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
  process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      console.log("HTTP server closed");
    });
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
