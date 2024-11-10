const User = require("../../models/User");

const registerForEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //check whether it already exist
    if (user.registeredEvents.includes(eventId)) {
      return res.json({
        success: false,
        message: "Already Registered !",
      });
    }

    // Add the event ID to the registeredEvents array
    user.registeredEvents.push(eventId);
    await user.save();

    res
      .status(200)
      .json({ message: "Registered for event successfully!", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error occurred", success: false });
  }
};

const getUserRegisteredEvents = async (req, res) => {
  

  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is mandatory!",
      });
    }

    const user = await User.findById(id).populate("registeredEvents");

    res.status(200).json({ data: user.registeredEvents , success:true});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const leaveEvent = async (req, res) => {
    const { userId, eventId } = req.params;
    try {
      // Find the user by ID
      console.log(req);
      console.log("hello")
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Remove the event ID from the registeredEvents array
      user.registeredEvents = user.registeredEvents.filter(
        (id) => id.toString() !== eventId.toString()
      );
  
      await user.save();
  
      res.status(200).json({ message: "Successfully left the event", success: true });
    } catch (error) {
      res.status(500).json({ message: "Error occurred", success: false });
    }
  };

module.exports = { registerForEvent, getUserRegisteredEvents , leaveEvent };
