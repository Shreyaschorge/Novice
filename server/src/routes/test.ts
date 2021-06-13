import express from "express";

const router = express.Router();

router.get("/api/test", (req, res) => {
  res.send('Working..');
})

export { router as testRouter };