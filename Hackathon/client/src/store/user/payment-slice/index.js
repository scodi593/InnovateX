import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  eventPaymentId: null,
  eventPaymentList: []
};

export const createNewPayment = createAsyncThunk(
  "/payment/createNewPayment",
  async (paymentData) => {
    const response = await axios.post(
      "http://localhost:5001/api/user/payment/create",
      paymentData
    );
    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/payment/capturePayment",
  async ({ paymentId, payerId, eventPaymentId }) => {
    console.log(paymentId, payerId, eventPaymentId);
    const response = await axios.post(
      "http://localhost:5001/api/user/payment/capture",
      {
        paymentId,
        payerId,
        eventPaymentId,
      }
    );

    return response.data;
  }
);

export const getAllEventsPaidUserId = createAsyncThunk(
  "/payment/getAllEventsPaidUserId",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5001/api/user/payment/list/${userId}`
    );

    return response.data;
  }
);

const eventPaymentSlice = createSlice({
  name: "eventPaymentSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.eventPaymentId = action.payload.eventPaymentId;
        sessionStorage.setItem(
          "currentEventPaymentId",
          JSON.stringify(action.payload.eventPaymentId)
        );
      })
      .addCase(createNewPayment.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.eventPaymentId = null;
      })
      .addCase(getAllEventsPaidUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEventsPaidUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eventPaymentList = action.payload.data;
      })
      .addCase(getAllEventsPaidUserId.rejected, (state) => {
        state.isLoading = false;
        state.eventPaymentList = [];
      });
  },
});

export default eventPaymentSlice.reducer;
