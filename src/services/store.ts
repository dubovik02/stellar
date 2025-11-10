import { socketMiddleware } from '@/utils/feed-middleware';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import {
  connect,
  connecting,
  disconnect,
  onClose,
  onError,
  onMessage,
  onOpen,
} from '../services/feed/feed-actions';
import rootReducer from './root-reducer';

const feedMiddleware = socketMiddleware({
  connect: connect,
  disconnect: disconnect,
  onConnecting: connecting,
  onMessage: onMessage,
  onClose: onClose,
  onOpen: onOpen,
  onError: onError,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;

export type RootStoreState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
