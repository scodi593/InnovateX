import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  registeredEvents: [],
};

// Fetch registered events for a user
export const getUserRegisteredEvents = createAsyncThunk(
  "events/getUserRegisteredEvents",
  async (userId) => {
    //console.log("Id: " , userId);
    const result = await axios.get(
      `http://localhost:5001/api/user/registeredevents/get/${userId}`
    );
    return result?.data; // Assuming the data contains the registered events array
  }
);

// Register for an event
export const registerEvent = createAsyncThunk(
  "events/registerEvent",
  async ({userId, eventId}) => {
    //console.log(userId,eventId)
    const result = await axios.post(
      "http://localhost:5001/api/user/registeredevents/add",
      { userId, eventId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data; // Assuming the API returns updated event registration data
  }
);

//leave the event
export const leaveEvent = createAsyncThunk(
  'events/leaveEvent',
  async ({ userId, eventId }) => {
      //console.log(userId,eventId)
    const result = await axios.delete(
      `http://localhost:5001/api/user/registeredevents/leave/${userId}/${eventId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

const RegisteredUserEvents = createSlice({
  name: "userRegisteredEvents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserRegisteredEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserRegisteredEvents.fulfilled, (state, action) => {
        //console.log(action.payload.data)
        state.isLoading = false;
        state.registeredEvents = action.payload.data;
      })
      .addCase(getUserRegisteredEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.registeredEvents = [];
      });
  },
});


export default RegisteredUserEvents.reducer;