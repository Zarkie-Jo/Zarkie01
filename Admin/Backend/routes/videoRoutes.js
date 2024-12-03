const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create videos directory inside uploads if it doesn't exist
const videosDir = path.join(__dirname, "..", "uploads", "videos");
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, videosDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, "video-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp4|webm|ogg/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext) && file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files (mp4, webm, ogg) are allowed!"));
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});

// POST route to handle video upload
router.post("/upload", upload.single("video"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    const filePath = `/uploads/videos/${req.file.filename}`;
    console.log("Video saved at:", path.join(videosDir, req.file.filename));

    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      filePath: filePath,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading video",
      error: error.message,
    });
  }
});

module.exports = router;
