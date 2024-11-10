import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { capturePayment } from "@/store/user/payment-slice";

const PaypalReturnPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const eventPaymentId = JSON.parse(sessionStorage.getItem("currentEventPaymentId"));

      dispatch(capturePayment({ paymentId, payerId, eventPaymentId })).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaypalReturnPage;
