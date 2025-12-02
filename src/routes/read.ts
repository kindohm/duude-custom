import express from "express";
import type { Request, Response } from "express";
import { getDb } from "../db.js";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const notificationsRef = db.collection("notifications");
    const snapshot = await notificationsRef
      .orderBy("datetime", "desc")
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.json({ error: "No notifications found", status: 404 });
    }

    const doc = snapshot.docs[0];

    // @ts-expect-error its ok
    const notification = { id: doc.id, ...doc.data() };
    return res.json({ ...notification, status: 200 });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
