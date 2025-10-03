import { createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

type TConstructorState = {
  bun: TIngredient | null;
  mainAndSauce: TIngredient[];
  isLoading: boolean;
};

const initialState: TConstructorState = {
  bun: null,
  mainAndSauce: [],
  isLoading: false,
};

export const constructorSlice = createSlice({
  name: 'constructorBuilder',
  initialState: initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload as TIngredient;
    },
    addIngredient: (state, action) => {
      state.mainAndSauce = [...state.mainAndSauce, action.payload as TIngredient];
    },
    delIngredient: (state, action) => {
      state.mainAndSauce = ([...state.mainAndSauce] as TIngredient[]).filter((item) => {
        return item.itemId !== (action.payload as TIngredient).itemId;
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

      const burgerComponents = [...state.mainAndSauce] as TIngredient[];

      burgerComponents.splice(
        targetIndex,
        0,
        burgerComponents.splice(sourceIndex, 1)[0]
      );
      state.mainAndSauce = [...burgerComponents];
    },
  },
});
