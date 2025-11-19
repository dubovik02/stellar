import { socketMiddleware } from '@/utils/feed-middleware';
import { userFeedMiddleware } from '@/utils/user-feed-middleware';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

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
import {
  connectingUF,
  connectUF,
  disconnectUF,
  onCloseUF,
  onErrorUF,
  onMessageUF,
  onOpenUF,
} from './user-feed/user-feed-actions';

import type { TypedUseSelectorHook } from 'react-redux';

const feedMiddleware = socketMiddleware({
  connect: connect,
  disconnect: disconnect,
  onConnecting: connecting,
  onMessage: onMessage,
  onClose: onClose,
  onOpen: onOpen,
  onError: onError,
});

const ufMiddleware = userFeedMiddleware({
  connectUF: connectUF,
  disconnectUF: disconnectUF,
  onConnectingUF: connectingUF,
  onMessageUF: onMessageUF,
  onCloseUF: onCloseUF,
  onOpenUF: onOpenUF,
  onErrorUF: onErrorUF,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware).concat(ufMiddleware);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootStoreState> = useSelector;

export type RootStoreState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
