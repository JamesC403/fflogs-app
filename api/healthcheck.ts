import express from "express";
const router = express.Router();

interface HealthCheckResponse {
  uptime: number;
  message: string;
  timestamp: number;
}

router.get("/", (_, res) => {
  const healthcheck: HealthCheckResponse = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };

  try {
    res.send(healthcheck);
  } catch (e) {
    healthcheck.message = (e as Error).message;
    res.status(503).send(healthcheck);
  }
});

export default router;
