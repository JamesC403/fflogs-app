import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
  res.send({ message: "OK" });
});

router.post("/", (req, res) => {
  if (req.body) {
    res.send({ message: "Got body", body: req.body });
  } else {
    res.status(400);
  }
});

export default router;
