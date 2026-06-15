 import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';




export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async ({ storeId }, thunkAPI) => {
   try {
    const { data } = await axios.get('/api/products' + (storeId ? `?storeId=${storeId}` : ''))
    return data.products// فرض بر این است که بک‌اند شیء شامل آرایه products برمی‌گرداند
    } catch (error) {
      const message = error?.response?.data?.error || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const productSlice = createSlice({
    name: 'product',
    initialState: {
        list:[],
    },
    reducers: {
        setProduct: (state, action) => {
            state.list = action.payload
        },
        clearProduct: (state) => {
            state.list = []
        }
    },
    extraReducers:(builder)=>{
      builder.addCase(fetchProducts.fulfilled,(state,action)=>{
        state.list=action.payload
      })      
    }
})

export const { setProduct, clearProduct } = productSlice.actions

export default productSlice.reducer