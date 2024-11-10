import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEventsPaidUserId } from "@/store/user/payment-slice";
import { fetchEventDetails } from "@/store/user/event-slice";

const Payment = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { eventPaymentList } = useSelector((state) => state.userEventPayment);
  const [eventsDetails, setEventsDetails] = useState({});

  useEffect(() => {
    dispatch(getAllEventsPaidUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    const fetchEvents = async() => {
      const details = {};
      const fetchPromise = [];
      for (const payment of eventPaymentList) {
        const eventId = payment.eventId;
        if (!details[eventId]) {
          const promise = dispatch(fetchEventDetails(eventId)).then((data) => {
            details[eventId] = data.payload.data;
            console.log(`Fetched details for ${eventId}:`, details[eventId]);
          }); 
          fetchPromise.push(promise)
        }
      }
      await Promise.all(fetchPromise);
      console.log('All event details fetched:', details);
      setEventsDetails(details);
    };

    if (eventPaymentList.length > 0) {
      fetchEvents();
    }
  }, [eventPaymentList]);

//   console.log(eventsDetails)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Event Name</TableHead>
              <TableHead className="text-left">Event Date</TableHead>
              <TableHead className="text-left">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {eventPaymentList && eventPaymentList.length > 0 ? (
              eventPaymentList.map((payment) => {
                const eventDetail = eventsDetails[payment.eventId];
                //console.log(eventDetail, "My details")
                return (
                  <TableRow key={payment.eventId}>
                    <TableCell className="text-left">
                      {eventDetail ? eventDetail.eventName : "Loading..."}
                    </TableCell>
                    <TableCell className="text-left">
                      {eventDetail ? new Date(eventDetail.eventDate).toLocaleDateString() : "Loading..."}
                    </TableCell>
                    <TableCell className="text-left">{payment?.paymentStatus}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <span>No Payments</span>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Payment;
