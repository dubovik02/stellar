import { checkResponse } from '@/utils/api';
import properties from '@/utils/properties';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TOrder } from '@/utils/types';

type TOrderState = {
  data: TOrder | null;
  isLoading: boolean;
  isModalShow: boolean;
};

const initialState: TOrderState = {
  data: null,
  isLoading: false,
  isModalShow: false,
};

export const loadOrder = createAsyncThunk(
  'order/loadOrder',
  async (componentIdObj: Record<string, unknown>) => {
    const data = await fetch(properties.api.baseUrl + properties.api.orderUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(componentIdObj),
    }).then(checkResponse);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload as TOrder;
        state.isModalShow = true;
      })
      .addCase(loadOrder.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
