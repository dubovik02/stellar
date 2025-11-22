import {
  ingredientsSlice,
  initialIngredientsState,
  loadIngredients,
} from './burger-ingredients-slice';

import type { TInintialIngredientsState } from '@/utils/types';

const testIngredientResponse: TInintialIngredientsState = {
  data: [],
  isLoading: false,
};

describe('Ingredients reducers', (): void => {
  it('should return the initial state', () => {
    const state = ingredientsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialIngredientsState);
  });

  it('loadIngredients Pending', () => {
    const action = { type: loadIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialIngredientsState, action);
    expect(state).toEqual({ ...initialIngredientsState, isLoading: true });
  });

  it('loadIngredients fullfield', () => {
    const action = {
      type: loadIngredients.fulfilled.type,
      payload: testIngredientResponse,
    };
    const state = ingredientsSlice.reducer(initialIngredientsState, action);
    expect(state).toEqual({
      ...initialIngredientsState,
      data: testIngredientResponse.data,
      isLoading: false,
    });
  });

  it('loadIngredients rejected', () => {
    const action = {
      type: loadIngredients.rejected.type,
    };
    const state = ingredientsSlice.reducer(initialIngredientsState, action);
    expect(state).toEqual({ ...initialIngredientsState, isLoading: false });
  });
});
