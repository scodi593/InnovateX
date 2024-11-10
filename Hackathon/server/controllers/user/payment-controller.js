const paypal = require("../../helpers/paypal");
const EventPayment = require("../../models/EventPayment");
const Event = require("../../models/Event")

const createPayment = async (req, res) => {
  try {
    const {
      userId,
      eventId,
      paymentMethod,
      paymentStatus,
      totalAmount,
      paymentId,
      payerId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/paypal-return",
        cancel_url: "http://localhost:5173/paypal-cancel",
      },
      transactions: [
        {
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: `Payment for event ${eventId}`,
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Error while creating PayPal payment",
        });
      } else {
        const newPayment = new EventPayment({
          userId,
          eventId,
          paymentMethod,
          paymentStatus,
          totalAmount,
          paymentId,
          payerId,
        });

        await newPayment.save();

        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        res.status(201).json({
          success: true,
          approvalURL,
          eventPaymentId: newPayment._id,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, eventPaymentId } = req.body;

    let eventpayment = await EventPayment.findById(eventPaymentId);
    if (!eventpayment) {
      return res.status(404).json({
        success: false,
        message: "Event Payment can not be found",
      });
    }

    eventpayment.paymentStatus = "paid";
    eventpayment.payerId = payerId;
    eventpayment.paymentId = paymentId;

    let event = await Event.findById(eventpayment.eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (event.participantLimit <= 0) {
      return res.status(400).json({
        success: false,
        message: "No more participant slots available for this event",
      });
    }

    event.participantLimit -= 1;
     // Save the updated event and registration
    await event.save();
    await eventpayment.save();
    res.status(200).json({
      success: true,
      message: "Event registration confirmed",
      data: eventpayment,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "An error occurred during payment capture!",
    });
  }
};

const getAllEventsPaidByUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const eventPayment = await EventPayment.find({ userId });
  
      if (!eventPayment.length) {
        return res.status(404).json({
          success: false,
          message: "No Eevnts paid!",
        });
      }
  
      res.status(200).json({
        success: true,
        data: eventPayment,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  };

module.exports = {
  createPayment,
  capturePayment,
  getAllEventsPaidByUser
};

