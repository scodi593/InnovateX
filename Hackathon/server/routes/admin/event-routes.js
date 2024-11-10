const express = require("express");
const {
  handleImageUpload,
  addEvent,
  fetchAllEvents,
  ediEvent,
  deleteEvent,
} = require("../../controllers/admin/event-controller");
const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addEvent);
router.put("/edit/:id", ediEvent);
router.delete("/delete/:id", deleteEvent);
router.get("/get", fetchAllEvents);

module.exports = router;
