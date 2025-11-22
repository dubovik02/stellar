import {
  addBun,
  addIngredient,
  clearAll,
  constructorInitialState,
  constructorSlice,
  delIngredient,
  reorderIngredients,
} from './burger-constructor-slice';

import type { TIngredient } from '@/utils/types';

const testBun: TIngredient = {
  _id: '60666c42cc7b410027a1a9b1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
};

const testMain: TIngredient = {
  _id: '60666c42cc7b410027a1a9b5',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
  __v: 0,
  itemId: '1',
};

const testSauce: TIngredient = {
  _id: '60666c42cc7b410027a1a9b7',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
  itemId: '2',
};

describe('Constructor-burger reducer', (): void => {
  it('should return the initial state', () => {
    const state = constructorSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(constructorInitialState);
  });

  it('should add a bun to the state', () => {
    const action = { type: addBun.type, payload: testBun };
    const state = constructorSlice.reducer(constructorInitialState, action);
    expect(state).toEqual({ ...constructorInitialState, bun: testBun });
  });

  it('should add an ingredient to the state', () => {
    const action = { type: addIngredient.type, payload: testMain };
    const state = constructorSlice.reducer(constructorInitialState, action);
    expect(state).toEqual({ ...constructorInitialState, mainAndSauce: [testMain] });
  });

  it('should delete an ingredient from the state', () => {
    const actionAdd = { type: addIngredient.type, payload: testMain };
    const actionDel = { type: delIngredient.type, payload: testMain };
    const state = constructorSlice.reducer(constructorInitialState, actionAdd);
    const newState = { ...state };
    const stateAfterDel = constructorSlice.reducer(newState, actionDel);
    expect(stateAfterDel).toEqual({ ...constructorInitialState, mainAndSauce: [] });
  });

  it('should delete all bun and ingredients from the state', () => {
    const actionAddBun = { type: addBun.type, payload: testBun };
    const actionAddIngr = { type: addIngredient.type, payload: testMain };
    const actionDel = { type: clearAll.type };
    const state = constructorSlice.reducer(constructorInitialState, actionAddBun);
    const prevState = { ...state };
    const newState = constructorSlice.reducer(prevState, actionAddIngr);
    const stateAfterDel = constructorSlice.reducer(newState, actionDel);
    expect(stateAfterDel).toEqual({ ...constructorInitialState });
  });

  it('should reorder ingredients in the state', () => {
    const actionAddFirstIngr = { type: addIngredient.type, payload: testMain };
    const actionAddSecondIngr = { type: addIngredient.type, payload: testSauce };
    const actionReorder = {
      type: reorderIngredients.type,
      payload: { sourceId: testMain.itemId, targetId: testSauce.itemId },
    };
    const state = constructorSlice.reducer(constructorInitialState, actionAddFirstIngr);
    const prevState = { ...state };
    const newState = constructorSlice.reducer(prevState, actionAddSecondIngr);
    const afterReorderState = constructorSlice.reducer(newState, actionReorder);
    const expectOrder = [testSauce, testMain];
    expect(afterReorderState.mainAndSauce).toEqual([...expectOrder]);
  });
});
