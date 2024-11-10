const express = require("express");
const {createPayment, capturePayment , getAllEventsPaidByUser} = require("../../controllers/user/payment-controller")

const router = express.Router();

router.post("/create", createPayment);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllEventsPaidByUser);
//router.get("/details/:id", getOrderDetails);

module.exports = router;