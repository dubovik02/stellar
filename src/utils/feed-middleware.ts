import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  Middleware,
} from '@reduxjs/toolkit';

export type WsActions<R> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  onConnecting?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 5000;

export const socketMiddleware = <TFeedState>(
  wsActions: WsActions<TFeedState>
): Middleware<Record<string, never>> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const { connect, disconnect, onConnecting, onClose, onOpen, onError, onMessage } =
      wsActions;
    const { dispatch } = store;
    let reconnectTimer: NodeJS.Timeout;
    let isConnected = false;
    let url = '';

    return (next) => (action) => {
      if (connect.match(action)) {
        socket = new WebSocket(action.payload);
        url = action.payload;
        isConnected = true;
        onConnecting && dispatch(onConnecting());

        socket.onopen = (): void => {
          onOpen && dispatch(onOpen());
        };
        socket.onclose = (): void => {
          onClose && dispatch(onClose());

          if (isConnected) {
            reconnectTimer = setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };
        socket.onerror = (): void => {
          dispatch(onError('Error while connecting to WS ...'));
        };
        socket.onmessage = (event: MessageEvent): void => {
          const data = event.data as string;

          try {
            const parsedData = JSON.parse(data) as TFeedState;
            dispatch(onMessage(parsedData));
          } catch (error) {
            dispatch(onError((error as Error).message));
          }
        };

        return;
      }

      if (socket && disconnect.match(action)) {
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
