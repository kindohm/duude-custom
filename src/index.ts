import express from "express";
import notifyRoute from "./routes/notify.js";
import readRoute from "./routes/read.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve public files
app.use(express.static("public"));

// API Routes
app.use("/api/send", notifyRoute);
app.use("/api/read", readRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
