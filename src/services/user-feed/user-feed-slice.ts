import { createSlice } from '@reduxjs/toolkit';

import {
  connectingUF,
  onCloseUF,
  onErrorUF,
  onMessageUF,
  onOpenUF,
} from './user-feed-actions';

import type { TUserFeedInitialState, TUserFeedState } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: TUserFeedInitialState = {
  data: {
    success: false,
    orders: [],
  },
  isLoading: false,
  error: '',
};

export const userFeedSlice = createSlice({
  name: 'userFeed',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorText: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  //selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectingUF, (state) => {
        state.isLoading = true;
      })
      .addCase(onOpenUF, (state) => {
        state.isLoading = false;
      })
      .addCase(onErrorUF, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(onCloseUF, (state) => {
        state.isLoading = false;
      })
      .addCase(onMessageUF, (state, action: PayloadAction<TUserFeedState>) => {
        state.data = action.payload;
      });
  },
});

export const { setIsLoading, setErrorText } = userFeedSlice.actions;
