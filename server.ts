import express from "express";
import { createDebugLog } from "./lib/stdout";

import apirouter from "./api";

const debug = createDebugLog("server");

const app = express();
const port = process.env.PORT || 5000;

const server = app.listen(port, () => debug(`Listening on port ${port}`));

app.use("/api", apirouter);

process.on("SIGTERM", () => {
  debug("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    debug("HTTP server closed");
  });
});
