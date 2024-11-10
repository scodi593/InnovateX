import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { FaFacebook, FaWhatsapp } from "react-icons/fa"; // Importing social icons (you need a library like react-icons)

const EventDetailDialog = ({ open, setOpen, eventDetails, handleRegister }) => {
    
  const { user } = useSelector((state) => state.auth);

  function handleDialogClose() {
    setOpen(false);
  }

  // Web Share API (for mobile or compatible devices)
  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: eventDetails?.eventName,
          text: eventDetails?.description,
          url: window.location.href, // URL of the event details page
        });
        console.log("Event shared successfully!");
      } catch (error) {
        console.log("Error sharing the event", error);
      }
    } else {
      alert("Web Share API not supported on this browser.");
    }
  };

  // Custom share for Facebook
  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Custom share for WhatsApp
  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `${eventDetails?.eventName}\n${eventDetails?.description}\n${window.location.href}`
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={eventDetails?.image}
            alt={eventDetails?.eventName}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{eventDetails?.eventName}</h1>
            <div className="text-muted-foreground text-2xl mb-5 mt-4 max-h-80 overflow-y-auto">
              {eventDetails?.description}
            </div>
          </div>
          <div className="flex items-center justify-between">
            {eventDetails?.price > 0 ? (
              <p className="text-3xl font-bold text-primary">${eventDetails?.price}</p>
            ) : (
              <span className="text-lg font-semibold">Free</span>
            )}
          </div>
          <div className="mt-5 mb-5">
            {eventDetails?.participantLimit === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">Out of Stock</Button>
            ) : (
              <Button
                className="w-full"
                onClick={() => {
                  handleRegister(eventDetails?._id, user?.id);
                }}
              >
                Register
              </Button>
            )}
          </div>

          {/* Share Buttons */}
          <div className="flex space-x-4 mt-4">
            {/* Facebook Share Button */}
            <Button className="w-full" onClick={handleFacebookShare}>
              <FaFacebook className="mr-2" /> Share on Facebook
            </Button>

            {/* WhatsApp Share Button */}
            <Button className="w-full" onClick={handleWhatsAppShare}>
              <FaWhatsapp className="mr-2" /> Share on WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailDialog;