const mongoose = require("mongoose");

const EventPaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID of the user registering for the event
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }, // Reference to the Event collection
  paymentMethod: { type: String, required: true }, // Payment method (e.g., credit card, PayPal)
  paymentStatus: { type: String, default: "Pending" }, // Payment status (Pending, Completed, etc.)
  totalAmount: { type: Number, required: true }, // Total amount paid (event fee)
  paymentDate: { type: Date, default: Date.now }, // Date of registration
  paymentId: { type: String }, // ID from the payment gateway
  payerId: { type: String }, // Payer ID from the payment gateway
});

module.exports = mongoose.model("EventPayment", EventPaymentSchema);