import {
  connectingUF,
  onCloseUF,
  onErrorUF,
  onMessageUF,
  onOpenUF,
} from './user-feed-actions';
import {
  initialUserFeedState,
  setErrorText,
  setIsLoading,
  userFeedSlice,
} from './user-feed-slice';

const errorText = 'error';

const testData = {
  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

describe('User-Feed reducers', (): void => {
  it('should return the initial state', () => {
    const state = userFeedSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialUserFeedState);
  });

  it('should set error text', () => {
    const action = { type: setErrorText.type, payload: errorText };
    const state = userFeedSlice.reducer(initialUserFeedState, action);
    expect(state).toEqual({ ...initialUserFeedState, error: errorText });
  });

  it('should set isLoading prop', () => {
    const action = { type: setIsLoading.type, payload: true };
    const state = userFeedSlice.reducer(initialUserFeedState, action);
    expect(state).toEqual({ ...initialUserFeedState, isLoading: true });
  });

  it('should set isLoading prop while connecting', () => {
    const action = { type: connectingUF.type };
    const state = userFeedSlice.reducer(initialUserFeedState, action);
    expect(state).toEqual({ ...initialUserFeedState, isLoading: true });
  });

  it('should set isLoading prop while opening', () => {
    const action = { type: onOpenUF.type };
    const state = userFeedSlice.reducer(initialUserFeedState, action);
    expect(state).toEqual({ ...initialUserFeedState, isLoading: false });
  });

  it('should set isLoading prop and error while erroring', () => {
    const action = { type: onErrorUF.type, payload: errorText };
    const state = userFeedSlice.reducer(initialUserFeedState, action);
    expect(state).toEqual({ ...initialUserFeedState, error: errorText });
  });

  it('should set isLoading prop while closeing', () => {
    const action = { type: onCloseUF.type };
    const state = userFeedSlice.reducer(initialUserFeedState, action);
    expect(state).toEqual({ ...initialUserFeedState, isLoading: false });
  });

  it('should set data while message', () => {
    const action = { type: onMessageUF.type, payload: testData };
    const state = userFeedSlice.reducer(initialUserFeedState, action);
    expect(state).toEqual({ ...initialUserFeedState, data: testData });
  });
});
