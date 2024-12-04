const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

router.post("/", async (req, res) => {
  try {
    // Your event creation logic here
    const { title, description, startDate, endDate, location } = req.body;

    // Create the event in your database
    const newEvent = await Event.create({
      title,
      description,
      startDate,
      endDate,
      location,
    });

    res.status(201).json({ success: true, event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ success: false, message: "Error creating event" });
  }
});

module.exports = router;
