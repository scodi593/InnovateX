import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  eventList: [],
};

// Add new event
export const addNewEvent = createAsyncThunk(
  "/events/addNewEvent",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5001/api/admin/events/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

// Fetch all events
export const fetchAllEvents = createAsyncThunk(
  "/events/fetchAllEvents",
  async () => {
    const result = await axios.get(
      "http://localhost:5001/api/admin/events/get"
    );

    return result?.data;
  }
);

//edit event
export const editEvent = createAsyncThunk(
  "/events/editEvent",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5001/api/admin/events/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const deleteEvent = createAsyncThunk(
  "/events/deleteEvent",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:5001/api/admin/events/delete/${id}`
    );

    return result?.data;
  }
);

const AdminEventsSlice = createSlice({
  name: "adminEvents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false;
        state.eventList = action.payload.data;
      })
      .addCase(fetchAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.eventList = [];
      });
  },
});


export default AdminEventsSlice.reducer;