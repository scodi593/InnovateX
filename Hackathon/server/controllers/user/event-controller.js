const Event = require("../../models/Event");

const getFilteredEvents = async (req, res) => {
  try {
    const { type = [], price = [], sortBy = "date-asc" } = req.query;
    let filters = {};

    if (type.length) {
      filters.type = { $in: type.split(",") };
    }

    if (price.length) {
      filters.price = {}; // Initialize price filter
      if (price.includes("free")) {
        filters.price.$eq = 0; // Assuming free events have a price of 0
      }
      if (price.includes("under10")) {
        filters.price.$lt = 10; 
      }
      if (price.includes("over10")) {
        filters.price.$gte = 10; 
      }
    }

    let sort = {};

    switch (sortBy) {
      case "date-asc":
        sort.eventDate = 1;
        break;

      case "date-desc":
        sort.eventDate = -1;
        break;

      case "title-atoz":
        sort.eventName = 1;
        break;

      case "title-ztoa":
        sort.eventName = -1;
        break;

      default:
        sort.eventDate = 1;
        break;
    }

    const events = await Event.find(filters).sort(sort);
    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};


const getEventDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event)
      return res.status(404).json({
        success: false,
        message: "Event not found!",
      });

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};




module.exports = { getFilteredEvents,getEventDetails };
