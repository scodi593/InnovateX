import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  address: null,
};


export const addNewAddress = createAsyncThunk(
    "/addresses/addNewAddress",
    async (formData) => {
        console.log(formData)
      const response = await axios.post(
        "http://localhost:5001/api/user/address/add",
        formData
      );
  
      return response.data;
    }
  );
  

  export const fetchAddress = createAsyncThunk(
    "/addresses/fetchAllAddresses",
    async (userId) => {
      const response = await axios.get(
        `http://localhost:5001/api/user/address/get/${userId}`
      );
  
      return response.data;
    }
  );

  export const deleteAddress = createAsyncThunk(
    "/addresses/deleteAddress",
    async (userId) => {
      const response = await axios.delete(
        `http://localhost:5001/api/user/address/delete/${userId}`
      );
  
      return response.data;
    }
  );

  const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addNewAddress.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(addNewAddress.fulfilled, (state, action) => {
          state.isLoading = false;
        })
        .addCase(addNewAddress.rejected, (state) => {
          state.isLoading = false;
        })
        .addCase(fetchAddress.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchAddress.fulfilled, (state, action) => {
            console.log(action.payload)
          state.isLoading = false;
          state.address = action.payload.data;
        })
        .addCase(fetchAddress.rejected, (state) => {
          state.isLoading = false;
          state.address = null;
        });
    },
  });

  export default addressSlice.reducer;
  