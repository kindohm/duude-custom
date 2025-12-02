import express from "express";
import type { Request, Response } from "express";
import { getDb } from "../db.js";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const datetime = new Date().toISOString();
    const notificationsRef = db.collection("notifications");
    const docRef = await notificationsRef.add({
      datetime,
    });

    return res.json({
      message: "Notification created",
      id: docRef.id,
      datetime,
      status: 201,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
