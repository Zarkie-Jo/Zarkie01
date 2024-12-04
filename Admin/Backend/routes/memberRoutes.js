const express = require("express");
const Member = require("../models/members");
const router = express.Router();
const upload = require("../middleware/uploadConfig");

router.get("/", async (req, res) => {
  try {
    const members = await Member.find({ isDeleted: false });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب الأعضاء", error });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { fullName, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "يجب رفع صورة" });
    }
    const image = `/uploads/${req.file.filename}`;
    const newMember = new Member({
      fullName,
      description,
      image,
      isDeleted: false,
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(500).json({
      message: "خطأ في إضافة العضو",
      error: error.message,
    });
  }
});
module.exports = router;
