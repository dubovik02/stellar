import { getNewToken } from './api';

import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';

export type WsUserActions<R> = {
  connectUF: ActionCreatorWithPayload<string>;
  disconnectUF: ActionCreatorWithoutPayload;
  onConnectingUF?: ActionCreatorWithoutPayload;
  onCloseUF?: ActionCreatorWithoutPayload;
  onOpenUF?: ActionCreatorWithoutPayload;
  onErrorUF: ActionCreatorWithPayload<string>;
  onMessageUF: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 5000;

export const userFeedMiddleware = <TUserFeedState>(
  wsActions: WsUserActions<TUserFeedState>,
  withTokenRefresh = true
): Middleware<Record<string, never>> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connectUF,
      disconnectUF,
      onConnectingUF,
      onCloseUF,
      onOpenUF,
      onErrorUF,
      onMessageUF,
    } = wsActions;
    const { dispatch } = store;
    let reconnectTimer: NodeJS.Timeout;
    let isConnected = false;
    let url = '';

    return (next) => (action) => {
      if (connectUF.match(action)) {
        socket = new WebSocket(action.payload);
        url = action.payload;
        isConnected = true;
        onConnectingUF && dispatch(onConnectingUF());

        socket.onopen = (): void => {
          onOpenUF && dispatch(onOpenUF());
        };
        socket.onclose = (): void => {
          onCloseUF && dispatch(onCloseUF());

          if (isConnected) {
            reconnectTimer = setTimeout(() => {
              dispatch(connectUF(url));
            }, RECONNECT_PERIOD);
          }
        };
        socket.onerror = (): void => {
          dispatch(onErrorUF('Error while connecting to WS ...'));
        };
        socket.onmessage = (event: MessageEvent): void => {
          const data = event.data as string;

          try {
            const parsedData = JSON.parse(data) as unknown;

            if (
              withTokenRefresh &&
              (parsedData as Record<string, string>).message ===
                'Invalid or missing token'
            ) {
              getNewToken()
                .then((refreshedData) => {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set(
                    'token',
                    refreshedData.accessToken.replace('Bearer ', '')
                  );
                  dispatch(connectUF(wssUrl.toString()));
                })
                .catch((error) => {
                  dispatch(onErrorUF((error as Error).message));
                });

              dispatch(disconnectUF());

              return;
            }

            dispatch(onMessageUF(parsedData as TUserFeedState));
          } catch (error) {
            dispatch(onErrorUF((error as Error).message));
          }
        };

        return;
      }

      if (socket && disconnectUF.match(action)) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        socket.close();
        socket = null;

        return;
      }
      return next(action);
    };
  };
};
