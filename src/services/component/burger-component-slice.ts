import { createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type TComponentState = {
  component: TIngredient | null;
  isShow: boolean;
};

const initialState: TComponentState = {
  component: null,
  isShow: false,
};

export const componentSlice = createSlice({
  name: 'component',
  initialState: initialState,
  reducers: {
    showComponent: (state, action) => {
      state.component = action.payload as TIngredient;
      state.isShow = true;
    },
    hideComponent: (state) => {
      state.component = null;
      state.isShow = false;
    },
  },
});
