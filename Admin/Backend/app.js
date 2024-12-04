const express = require("express");
const cors = require("cors");
const joinRequestRoutes = require("./routes/joinRequestRoutes");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5174", "http://localhost:3000"], // Add any other origins you need
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], // Add PATCH to allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/join-requests", joinRequestRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

module.exports = app;
