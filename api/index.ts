import express from "express";
import healthcheck from "./healthcheck";
import test from "./test";

const apiRoutes = express.Router();

apiRoutes.use("/health", healthcheck);
apiRoutes.use("/test", test);

export default apiRoutes;
