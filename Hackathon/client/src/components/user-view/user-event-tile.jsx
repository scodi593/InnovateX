import React from 'react'
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { typeOptionsMap } from '@/config';

const UserEventTile = ({event,handleGetEventDetails}) => {

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        const date = new Date(dateString);
        return date
          .toLocaleDateString("en-GB", options)
          .split("/")
          .reverse()
          .join("-");
      };

      const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
      };

      const isEventEnded = new Date(event?.eventDate) < new Date();

  return (
    <Card className="w-full max-w-sm mx-auto" id = {event.eventName +" "+  event.type}>
    <div>
      <div className="relative">
        <img
          src={event?.image}
          alt={event?.eventName}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
        {event?.participantLimit === 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            No seats available
          </Badge>
        ) : event?.participantLimit < 10 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {`Only ${event?.participantLimit} seats left`}
          </Badge>
        ) : null}
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2">{event?.eventName}</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[16px] text-muted-foreground">
            {typeOptionsMap[event?.type]}
          </span>
          <span className="text-[16px] text-muted-foreground">
            Date: {formatDate(event?.eventDate)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          {event?.price > 0 ? (
            <span className="text-lg font-semibold text-primary">
              Fee: ${event?.price}
            </span>
          ) : <span className="text-lg font-semibold">Free</span>}
          <span className='text-[16px] text-muted-foreground'>Time: {formatTime(event?.eventDate)}</span>
        </div>
      </CardContent>
    </div>
    <CardFooter>
    {isEventEnded ? (
          <span className="w-full text-center text-muted-foreground">Event Ended</span>
        ) : event?.participantLimit === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            No seats available
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => handleGetEventDetails(event?._id)}
          >
            View
          </Button>
        )}
    </CardFooter>
  </Card>
  )
}

export default UserEventTile
