import { checkResponse } from '@/utils/api';
import properties from '@/utils/properties';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type TInintialIngredientsState = {
  data: TIngredient[];
  isLoading: boolean;
};

const initialState: TInintialIngredientsState = {
  data: [],
  isLoading: false,
};

export const loadIngredients = createAsyncThunk(
  'ingredients/loadIngredients',
  async () => {
    const data = (await fetch(
      properties.api.baseUrl + properties.api.ingredientsUrl
    ).then(checkResponse)) as object;
    return data;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = (action.payload as TInintialIngredientsState).data;
      })
      .addCase(loadIngredients.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
