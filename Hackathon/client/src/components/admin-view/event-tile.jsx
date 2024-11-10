import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const AdminEventTile = ({
  event,
  setOpenCreateEventsDialog,
  setFormData,
  setCurrentEditedId,
  handleDelete,
  setOpenUserListDialog,
}) => {
  const eventDate = new Date(event?.eventDate);
  const isPastEvent = eventDate < new Date();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", options)
      .split("/")
      .reverse()
      .join("-");
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={event?.image}
            alt={event?.eventName}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2
            className={`text-xl font-bold mb-2 mt-2 ${
              isPastEvent ? "line-through" : ""
            }`}
          >
            {event?.eventName}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-primary">
              Fee: ${event?.price}
            </span>
            <span className="text-lg font-bold">
              {formatDate(event?.eventDate)}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center flex-wrap">
          {isPastEvent ? (
            <span className="text-gray-500">Can't Edit</span>
          ) : (
            <Button
              onClick={() => {
                setOpenCreateEventsDialog(true);
                setCurrentEditedId(event?._id);
                setFormData(event);
              }}
            >
              Edit
            </Button>
          )}
          <Button onClick={() => handleDelete(event?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default AdminEventTile;
