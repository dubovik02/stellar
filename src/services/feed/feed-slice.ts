import { createSlice } from '@reduxjs/toolkit';

import { connecting, onOpen, onError, onClose, onMessage } from './feed-actions';

import type { TFeedInitialState, TFeedState } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: TFeedInitialState = {
  data: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  isLoading: false,
  error: '',
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorText: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connecting, (state) => {
        state.isLoading = true;
      })
      .addCase(onOpen, (state) => {
        state.isLoading = false;
      })
      .addCase(onError, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(onClose, (state) => {
        state.isLoading = false;
      })
      .addCase(onMessage, (state, action: PayloadAction<TFeedState>) => {
        state.data = action.payload;
      });
  },
});

export const { setIsLoading, setErrorText } = feedSlice.actions;
