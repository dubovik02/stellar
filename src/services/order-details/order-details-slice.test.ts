import {
  hideErorrModal,
  hideOrderModal,
  initialOrderDetailsState,
  loadOrder,
  orderSlice,
} from './order-details-slice';

import type { TOrder } from '@/utils/types';

const testOrder: TOrder = {
  name: 'order',
  order: {
    number: 123,
  },
  success: true,
};

describe('Order details reducers', (): void => {
  it('should return the initial state', () => {
    const state = orderSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialOrderDetailsState);
  });

  it('should hide order modal', () => {
    const action = { type: hideOrderModal.type };
    const state = orderSlice.reducer(initialOrderDetailsState, action);
    expect(state).toEqual({ ...initialOrderDetailsState, isModalShow: false });
  });

  it('should hide error modal', () => {
    const action = { type: hideErorrModal.type };
    const state = orderSlice.reducer(initialOrderDetailsState, action);
    expect(state).toEqual({ ...initialOrderDetailsState, error: '' });
  });

  it('loadOrder Pending', () => {
    const action = { type: loadOrder.pending.type };
    const state = orderSlice.reducer(initialOrderDetailsState, action);
    expect(state).toEqual({
      ...initialOrderDetailsState,
      isLoading: true,
      error: '',
    });
  });

  it('loadOrder fullfield', () => {
    const action = {
      type: loadOrder.fulfilled.type,
      payload: testOrder,
    };
    const state = orderSlice.reducer(initialOrderDetailsState, action);
    expect(state).toEqual({
      ...initialOrderDetailsState,
      data: testOrder,
      isLoading: false,
      isModalShow: true,
    });
  });

  it('loadOrder rejected', () => {
    const action = {
      type: loadOrder.rejected.type,
    };
    const state = orderSlice.reducer(initialOrderDetailsState, action);
    expect(state).toEqual({ ...initialOrderDetailsState, isLoading: false, error: '' });
  });
});
