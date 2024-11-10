const { imageUploadUtil } = require("../../helpers/cloudinary");
const Event = require("../../models/Event");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a event
const addEvent = async (req, res) => {
  try {
    const {
      image,
      eventName,
      type,
      participantLimit,
      price,
      eventDate,
      description,
    } = req.body;

    //Create the event
    const newlyCreatedEvent = new Event({
      image,
      eventName,
      type,
      participantLimit,
      price,
      eventDate,
      description,
    });
    await newlyCreatedEvent.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedEvent,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

//fetch a event
const fetchAllEvents = async (req, res) => {
  try {
    const listOfEvents = await Event.find({});
    res.status(200).json({
      success: true,
      data: listOfEvents,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

//edit a event
const ediEvent = async (req, res) => {
  try {
    const { id } = req.params; //updating by id

    const {
      image,
      eventName,
      type,
      participantLimit,
      price,
      eventDate,
      description,
    } = req.body;

    let findEvent = await Event.findById(id);
    if (!findEvent)
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });

    //updating with the current value or the previous value.
    findEvent.eventName = eventName || findEvent.eventName;
    findEvent.type = type || findEvent.type;
    findEvent.participantLimit = participantLimit || findEvent.participantLimit;
    findEvent.price = price === "" ? 0 : price || findEvent.price;
    findEvent.eventDate = eventDate || findEvent.eventDate;
    findEvent.description = description || findEvent.description;
    findEvent.image = image || findProduct.image

    await findEvent.save();
    res.status(200).json({
      success: true,
      data: findEvent,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

//delete a event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event)
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

module.exports = {
  handleImageUpload,
  addEvent,
  fetchAllEvents,
  ediEvent,
  deleteEvent,
};
