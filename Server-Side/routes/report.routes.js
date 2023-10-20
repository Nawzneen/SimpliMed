const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller.js"); // Import the controller

router.post("/users", reportController.getUsers);
router.post("/users&feedbacks", reportController.getUsersFeedbacks);
router.post("/usersWithFeedbacks", reportController.getUsersWithFeedbacks);

module.exports = router;
