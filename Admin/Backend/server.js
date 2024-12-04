require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const uploadRoute = require("./routes/uploadRoute");

// Import routes
const productRoutes = require("./routes/ProductRoutes");
const videoRoutes = require("./routes/videoRoutes");
const eventRoutes = require("./routes/eventRoutes");
const memberRoutes = require("./routes/memberRoutes");
const joinRoutes = require("./routes/joinRequestRoutes");

const app = express();

// Move CORS configuration to the top, before any routes
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Then add your routes
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/products", productRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/upload", uploadRoute);
app.use("/api/join-requests", joinRoutes);

// Debug middleware
app.use((req, res, next) => {
  console.log("Incoming request:", {
    method: req.method,
    url: req.url,
    path: req.path,
    body: req.body,
  });
  next();
});

// Create directories synchronously
const uploadsDir = path.join(__dirname, "uploads");
const videosDir = path.join(uploadsDir, "videos");

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log("Created uploads directory");
  }

  if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir);
    console.log("Created videos directory");
  }
} catch (err) {
  console.error("Error creating directories:", err);
  process.exit(1); // Exit if we can't create necessary directories
}

// Serve static files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".mp4")) {
        res.set({
          "Content-Type": "video/mp4",
          "Accept-Ranges": "bytes",
        });
      }
    },
  })
);

// Add support for video streaming
app.get("/api/videos/stream/:filename", (req, res) => {
  const videoPath = path.join(
    __dirname,
    "uploads",
    "videos",
    req.params.filename
  );
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

// Error handling for 404
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
