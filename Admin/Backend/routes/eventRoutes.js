const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAvailableEvents,
  submitJoinRequest,
  getUpcomingEvents,
} = require("../controller/eventController");

router.post("/create", createEvent);
router.get("/available", getAvailableEvents);
router.post("/join", submitJoinRequest);
router.get("/upcoming", getUpcomingEvents);

module.exports = router;
