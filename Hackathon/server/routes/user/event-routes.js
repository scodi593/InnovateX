const express = require("express");
const {
    getFilteredEvents,
    getEventDetails
} = require("../../controllers/user/event-controller");

const router = express.Router();


router.get("/get", getFilteredEvents);
router.get("/get/:id", getEventDetails)

module.exports = router;
