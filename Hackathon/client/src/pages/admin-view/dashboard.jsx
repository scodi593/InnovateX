import { Button } from "@/components/ui/button";
import React, { Fragment, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addEventFormElements } from "@/config";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewEvent,
  deleteEvent,
  editEvent,
  fetchAllEvents,
} from "@/store/admin/event-slice";
import { toast } from "@/hooks/use-toast";
import AdminEventTile from "@/components/admin-view/event-tile";
import { Dialog } from "@radix-ui/react-dialog";

const initialEventData = {
  image: null,
  eventName: "",
  type: "",
  description: "",
  participantLimit: "",
  price: "",
  dateTime: "",
};

const AdminDashboard = () => {
  const [openCreateEventsDialog, setOpenCreateEventsDialog] = useState(false);
  const [formData, setFormData] = useState(initialEventData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { eventList } = useSelector((state) => state.adminEvents);
  const [openUserListDialog, setOpenUserListDialog] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editEvent({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");
          if (data?.payload?.success) {
            dispatch(fetchAllEvents());
            setFormData(initialEventData);
            setOpenCreateEventsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewEvent({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          // console.log(data)
          if (data?.payload?.success) {
            dispatch(fetchAllEvents());
            setOpenCreateEventsDialog(false);
            setImageFile(null);
            setFormData(initialEventData);
            toast({
              title: "Event added successfully",
            });
          }
        });
  }

  function handleDelete(getCurrentEventId) {
    dispatch(deleteEvent(getCurrentEventId)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Event deleted",
        });
        dispatch(fetchAllEvents());
      }
    });
  }

  console.log(eventList);
  //console.log(formData)

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateEventsDialog(true)}>
          Add New Event
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {eventList && eventList.length > 0
          ? eventList.map((eventItem) => (
              <AdminEventTile
                event={eventItem}
                setOpenCreateEventsDialog={setOpenCreateEventsDialog} // to open the evnt tab
                setCurrentEditedId={setCurrentEditedId} // which event id it is and fill the data with that
                setFormData={setFormData} //tp set the form data
                handleDelete={handleDelete}
                setOpenUserListDialog={setOpenUserListDialog}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateEventsDialog}
        onOpenChange={() => {
          setOpenCreateEventsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialEventData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            {currentEditedId !== null ? "Edit Product" : "Add New Product"}
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formControls={addEventFormElements}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminDashboard;
