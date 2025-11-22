import {
  detailOrderSlice,
  initialDetailOrderState,
  loadDetailOrder,
} from './detail-order-slice';

import type { TOrderFeed, TOrderInfoResponse } from '@/utils/types';

const testOrder: TOrderFeed = {
  _id: '6919a2efa64177001b31edbc',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0946',
    '643d69a5c3f7b9001cfa093d',
  ],
  status: 'done',
  name: 'Био-марсианский флюоресцентный минеральный бургер',
  createdAt: new Date(),
  updatedAt: new Date(),
  number: 94319,
};

const testOrderResponse: TOrderInfoResponse = {
  success: true,
  orders: [testOrder],
};

const errText = 'error';

describe('Detail order reducers', (): void => {
  it('should return the initial state', () => {
    const state = detailOrderSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialDetailOrderState);
  });

  it('loadDetail Pending', () => {
    const action = { type: loadDetailOrder.pending.type };
    const state = detailOrderSlice.reducer(initialDetailOrderState, action);
    expect(state).toEqual({ ...initialDetailOrderState, isLoading: true });
  });

  it('loadDetail fullfield', () => {
    const action = { type: loadDetailOrder.fulfilled.type, payload: testOrderResponse };
    const state = detailOrderSlice.reducer(initialDetailOrderState, action);
    expect(state).toEqual({
      ...initialDetailOrderState,
      orders: testOrderResponse.orders,
    });
  });

  it('loadDetail rejected', () => {
    const action = {
      type: loadDetailOrder.rejected.type,
      error: { message: errText },
    };
    const state = detailOrderSlice.reducer(initialDetailOrderState, action);
    expect(state).toEqual({
      ...initialDetailOrderState,
      error: errText,
      isLoading: false,
    });
  });
});
