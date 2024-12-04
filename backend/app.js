const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const eventRoutes = require("./routes/eventRoutes");
const joinRequestRoutes = require("./routes/joinRequestRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Make sure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Connect to MongoDB
mongoose
  .connect("your_mongodb_connection_string", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/join-requests", joinRequestRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

module.exports = app;
