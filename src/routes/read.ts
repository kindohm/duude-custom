import express from "express";
import type { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  try {
    // Return sample data
    const data = {
      id: 1,
      title: "Sample Data",
      content: "This is sample data from the read endpoint",
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // Process read request
    console.log(`Read query received: ${query}`);

    res.json({ success: true, message: "Query processed" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
