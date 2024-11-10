const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    image: String,
    eventName: String,
    type: String,
    participantLimit: Number,
    price: Number,
    eventDate: Date,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
