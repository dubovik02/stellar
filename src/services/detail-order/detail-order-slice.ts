import { getOrderInfo } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TDetailOrderInitialState } from '@/utils/types';

const initialState: TDetailOrderInitialState = {
  orders: [],
  isLoading: false,
  error: '',
};

export const loadDetailOrder = createAsyncThunk(
  'detailOrder/loadDetailOrder',
  async (orderNumb: string) => {
    const res = await getOrderInfo(orderNumb);
    return res;
  }
);

export const detailOrderSlice = createSlice({
  name: 'detailOrder',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadDetailOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadDetailOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
      })
      .addCase(loadDetailOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Неизвестная ошибка:(';
      });
  },
});
