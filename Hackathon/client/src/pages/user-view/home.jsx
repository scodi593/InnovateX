import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserRegisteredEvents,
  leaveEvent,
} from "@/store/user/registeredevents-slice";
import RegisteredEventTile from "@/components/user-view/registered-event-tile";
import { toast } from "@/hooks/use-toast";
import { createNewPayment, getAllEventsPaidUserId } from "@/store/user/payment-slice";

const UserHome = () => {
  const dispatch = useDispatch();
  const { registeredEvents } = useSelector(
    (state) => state.registeredUserEvents
  );
  const { user } = useSelector((state) => state.auth);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { approvalURL,eventPaymentList } = useSelector((state) => state.userEventPayment);

  useEffect(() => {
    dispatch(getUserRegisteredEvents(user?.id));
    dispatch(getAllEventsPaidUserId(user?.id));
  }, [dispatch, user?.id]);

  const isEventPaid = (eventId) => {
    return eventPaymentList.some(payment => payment.eventId === eventId && payment.paymentStatus === "paid");
  };

  function handlePayment(eventId, eventPrice) {
    const paymentData = {
      userId: user?.id,
      eventId: eventId,
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: eventPrice,
      paymentId: "",
      payerId: "",
    };
    console.log("Paying for this eventid", paymentData);
    dispatch(createNewPayment(paymentData)).then((data) => {
      console.log(data, "My name");
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  }

  function handleLeaveEvent(eventId) {
    dispatch(leaveEvent({ userId: user?.id, eventId })).then((data) => {
      console.log("Dale: ", data);
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        dispatch(getUserRegisteredEvents(user?.id));
      }
    });
  }

 
  console.log(eventPaymentList, "My list pf payments")

  if(approvalURL){
    window.location.href = approvalURL
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {registeredEvents.length > 0 ? (
        registeredEvents.map((event) => (
          <RegisteredEventTile
            key={event._id}
            event={event}
            handleLeaveEvent={handleLeaveEvent}
            handlePayment={handlePayment}
            isPaid={isEventPaid(event._id)} 
          />
        ))
      ) : (
        <p>No registered events yet.</p>
      )}
    </div>
  );
};

export default UserHome;
