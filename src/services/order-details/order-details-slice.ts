import { createOrder } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TOrder } from '@/utils/types';

type TOrderState = {
  data: TOrder | null;
  isLoading: boolean;
  isModalShow: boolean;
  error?: string;
};

const initialState: TOrderState = {
  data: null,
  isLoading: false,
  isModalShow: false,
  error: '',
};

export const loadOrder = createAsyncThunk(
  'order/loadOrder',
  async (componentIdObj: Record<string, unknown>) => {
    const data = await createOrder(componentIdObj);
    return data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    hideOrderModal: (state) => {
      state.isModalShow = false;
    },
    hideErorrModal: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrder.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(loadOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload as TOrder;
        state.isModalShow = true;
      })
      .addCase(loadOrder.rejected, (state) => {
        state.isLoading = false;
        state.error = '';
      });
  },
});
