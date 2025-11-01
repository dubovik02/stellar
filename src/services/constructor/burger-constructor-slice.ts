import { createSlice } from '@reduxjs/toolkit';

import type { TConstructorState, TIngredient } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: TConstructorState = {
  bun: null,
  mainAndSauce: [],
  isLoading: false,
};

export const constructorSlice = createSlice({
  name: 'constructorBuilder',
  initialState: initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.mainAndSauce = [...state.mainAndSauce, action.payload];
    },
    delIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.mainAndSauce = [...state.mainAndSauce].filter((item) => {
        return item.itemId !== action.payload.itemId;
      });
    },
    reorderIngredients: (state, action) => {
      const sourceId = (action.payload as Record<string, unknown>).sourceId ?? 'emptyId';
      const targetId = (action.payload as Record<string, unknown>).targetId ?? 'emptyId';

      let sourceIndex = state.mainAndSauce.findIndex((item) => {
        return item.itemId === sourceId;
      });

      let targetIndex = state.mainAndSauce.findIndex((item) => {
        return item.itemId === targetId;
      });

      const buf = sourceIndex;
      if (sourceIndex > targetIndex) {
        sourceIndex = targetIndex;
        targetIndex = buf;
      }

      const burgerComponents = [...state.mainAndSauce];

      burgerComponents.splice(
        targetIndex,
        0,
        burgerComponents.splice(sourceIndex, 1)[0]
      );
      state.mainAndSauce = [...burgerComponents];
    },
  },
});

export const { addBun, addIngredient, delIngredient, reorderIngredients } =
  constructorSlice.actions;
