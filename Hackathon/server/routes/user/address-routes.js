const express = require("express");

const {
  addAddress,
  fetchAddress,
  deleteAddress} = require("../../controllers/user/address-controller")

  const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchAddress);
router.delete("/delete/:userId", deleteAddress);
module.exports = router;

