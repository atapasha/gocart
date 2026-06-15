import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchAddress = createAsyncThunk('address/fetchAddress',
  async ({ getToken }, thunkAPI) => {
    try {
      const token = await getToken();

      const { data } = await axios.get('/api/address', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

return data?.addresses || [];    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.error || error.message
      );
    }
  }
);

const addressSlice = createSlice({
  name: "address",

  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {
    addAddress: (state, action) => {
      state.list.push(action.payload);
    },

    clearAddress: (state) => {
      state.list = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addAddress, clearAddress } =
  addressSlice.actions;

export default addressSlice.reducer;