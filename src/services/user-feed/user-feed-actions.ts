import { createAction } from '@reduxjs/toolkit';

import type { TUserFeedState } from '@/utils/types';

export const connectUF = createAction<string, 'userFeed/connectUF'>(
  'userFeed/connectUF'
);
export const disconnectUF = createAction('userFeed/disconnectUF');

export const connectingUF = createAction('userFeed/connectingUF');
export const onOpenUF = createAction('useFeed/onopenUF');
export const onMessageUF = createAction<TUserFeedState, 'userFeed/onmessageUF'>(
  'userFeed/onmessageUF'
);
export const onErrorUF = createAction<string, 'userFeed/onerrorUF'>(
  'userFeed/onerrorUF'
);
export const onCloseUF = createAction('useFeed/oncloseUF');

export type UserFeedActionTypes =
  | ReturnType<typeof connectUF>
  | ReturnType<typeof disconnectUF>
  | ReturnType<typeof connectingUF>
  | ReturnType<typeof onOpenUF>
  | ReturnType<typeof onMessageUF>
  | ReturnType<typeof onErrorUF>
  | ReturnType<typeof onCloseUF>;
