import { connecting, onClose, onError, onMessage, onOpen } from './feed-actions';
import { feedSlice, initialFeedState, setErrorText, setIsLoading } from './feed-slice';

const errorText = 'error';

const testData = {
  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

describe('Feed reducers', (): void => {
  it('should return the initial state', () => {
    const state = feedSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialFeedState);
  });

  it('should set error text', () => {
    const action = { type: setErrorText.type, payload: errorText };
    const state = feedSlice.reducer(initialFeedState, action);
    expect(state).toEqual({ ...initialFeedState, error: errorText });
  });

  it('should set isLoading prop', () => {
    const action = { type: setIsLoading.type, payload: true };
    const state = feedSlice.reducer(initialFeedState, action);
    expect(state).toEqual({ ...initialFeedState, isLoading: true });
  });

  it('should set isLoading prop while connecting', () => {
    const action = { type: connecting.type };
    const state = feedSlice.reducer(initialFeedState, action);
    expect(state).toEqual({ ...initialFeedState, isLoading: true });
  });

  it('should set isLoading prop while opening', () => {
    const action = { type: onOpen.type };
    const state = feedSlice.reducer(initialFeedState, action);
    expect(state).toEqual({ ...initialFeedState, isLoading: false });
  });

  it('should set isLoading prop and error while erroring', () => {
    const action = { type: onError.type, payload: errorText };
    const state = feedSlice.reducer(initialFeedState, action);
    expect(state).toEqual({ ...initialFeedState, error: errorText });
  });

  it('should set isLoading prop while closeing', () => {
    const action = { type: onClose.type };
    const state = feedSlice.reducer(initialFeedState, action);
    expect(state).toEqual({ ...initialFeedState, isLoading: false });
  });

  it('should set data while message', () => {
    const action = { type: onMessage.type, payload: testData };
    const state = feedSlice.reducer(initialFeedState, action);
    expect(state).toEqual({ ...initialFeedState, data: testData });
  });
});
