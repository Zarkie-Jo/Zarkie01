const express = require("express");
const router = express.Router();
const {
  getAllJoinRequests,
  updateJoinRequestStatus,
} = require("../controllers/joinRequestController");

router.get("/", getAllJoinRequests);
router.patch("/:id/status", updateJoinRequestStatus);

module.exports = router;
