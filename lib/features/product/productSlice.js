import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async ({ storeId } = {}, thunkAPI) => { // اضافه شدن مقدار پیش‌فرض
    try {
      const { data } = await axios.get('/api/products' + (storeId ? `?storeId=${storeId}` : ''));
      // پشتیبانی از ساختارهای مختلف API
      return data.products || data || []; 
    } catch (error) {
      const message = error?.response?.data?.error || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProduct: (state, action) => {
      state.list = action.payload;
    },
    clearProduct: (state) => {
      state.list = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;