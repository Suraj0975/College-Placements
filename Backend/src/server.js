import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import placementRoutes from "./routes/placementRoutes.js";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */

// ✅ Proper CORS (Fix for frontend connection)
app.use(
  cors({
    origin: "http://localhost:5173", // 🔥 Frontend URL
    credentials: true,
  })
);

app.use(express.json());

/* ================= ROUTES ================= */

app.use("/placements", placementRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Placement Tracker API Running...");
});

/* ================= DATABASE + SERVER START ================= */

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("-------- Server Started --------");
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });