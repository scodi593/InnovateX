import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

//handleLeaveEvent, handlePayEvent
const RegisteredEventTile = ({ event, handleLeaveEvent, handlePayment, isPaid }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  };

  // Function to check if the event date has passed
  const isEventPast = (eventDate) => {
    const now = new Date();
    const eventDateTime = new Date(eventDate);
    return now > eventDateTime;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={event?.image}
            alt={event?.eventName}
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
          {/* Existing badge code ... */}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{event?.eventName}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              Date: {formatDate(event?.eventDate)}
            </span>
            <span className="text-[16px] text-muted-foreground">
              Time: {formatTime(event?.eventDate)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            {event?.price > 0 ? (
              <span className="text-lg font-semibold text-primary">
                Fee: ${event?.price}
              </span>
            ) : (
              <span className="text-lg font-semibold">Free</span>
            )}
          </div>
          {/* Display Paid status if the event is paid */}
          {isPaid ? (
            <span className="text-lg font-semibold text-green-600">Paid</span>
          ) : null}
        </CardContent>
      </div>

      <CardFooter className="space-x-2">
        {isEventPast(event?.eventDate) ? (
          <a
            href="https://your-reviews-website.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-blue-500 underline text-center"
          >
            Leave a Review
          </a>
        ) : (
          !isPaid && ( // Show buttons only if not paid
            <>
              <Button
                className="w-1/2"
                variant="destructive"
                onClick={() => handleLeaveEvent(event?._id)}
              >
                Leave
              </Button>
              {event?.price > 0 && (
                <Button className="w-1/2" onClick={() => handlePayment(event?._id, event?.price)}>
                  Pay
                </Button>
              )}
            </>
          )
        )}
      </CardFooter>
    </Card>
  );
};

export default RegisteredEventTile;

//onClick={() => handlePayEvent(event?._id)}
