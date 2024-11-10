const express = require("express");
const {
    registerForEvent,
    getUserRegisteredEvents,
    leaveEvent
} = require("../../controllers/user/user-events");


const router = express.Router();


router.post("/add",registerForEvent)
router.get("/get/:id",getUserRegisteredEvents)
router.delete("/leave/:userId/:eventId",leaveEvent)
module.exports = router;
