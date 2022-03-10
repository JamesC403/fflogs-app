import express from "express";
import Debug from "debug";

import healthcheck from "./server/healthcheck";

const debug = Debug("server");

const app = express();
const port = process.env.PORT || 5000;

const server = app.listen(port, () => debug(`Listening on port ${port}`));

app.use("/health", healthcheck);

process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    debug("HTTP server closed");
  });
});
