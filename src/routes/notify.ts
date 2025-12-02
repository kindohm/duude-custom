import express from "express";
import type { Request, Response } from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Process notification
    console.log(`Notification received: ${message}`);

    res.json({ success: true, message: "Notification processed" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
