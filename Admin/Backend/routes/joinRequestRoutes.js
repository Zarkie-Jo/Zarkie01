const express = require("express");
const router = express.Router();
const {
  getAllJoinRequests,
  updateJoinRequestStatus,
} = require("../controller/joinRequestController");

router.get("/", getAllJoinRequests);
router.put("/:id/status", updateJoinRequestStatus);
module.exports = router;
