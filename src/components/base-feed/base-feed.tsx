import { OrderCard } from '@/components/order-card/order-card';
import { Waiter } from '@/components/waiter/waiter';
import { connect } from '@/services/feed/feed-actions';
import { useAppDispatch } from '@/services/store';
import { connectUF } from '@/services/user-feed/user-feed-actions';
import { CONNECT_MODE } from '@/utils/types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { RootStoreState } from '@/services/store';
import type { TBaseFeedProps, TFeedState } from '@/utils/types';

import styles from './base-feed.module.css';

export const BaseFeed = (props: TBaseFeedProps): React.JSX.Element => {
  const isFeedMode = props.connectMode === CONNECT_MODE.FEED;
  const dispatch = useAppDispatch();
  useEffect(() => {
    //dispatch(connect(props.wssUrl));
    if (isFeedMode) {
      dispatch(connect(props.wssUrl));
    } else {
      dispatch(connectUF(props.wssUrl));
    }
  }, []);

  const { orders, isLoading } = useSelector((store: RootStoreState) => ({
    orders: isFeedMode ? store.feed.data : store.userFeed.data,
    isLoading: isFeedMode ? store.feed.isLoading : store.userFeed.isLoading,
  }));

  const getStatusNumber = (filterStatus: string): string[] => {
    const result: string[] = [];
    orders.orders.forEach((item) => {
      if (item.status === filterStatus && result.length < 10) {
        result.push(item.number.toString());
      }
    });
    return result;
  };

  const total = isFeedMode ? (orders as TFeedState).total : 0;
  const totalToday = isFeedMode ? (orders as TFeedState).totalToday : 0;

  const waiter = <Waiter />;

  return (
    <>
      {props.isStatisticDataWillShow && (
        <h1 className="text text_type_main-large">Лента заказов</h1>
      )}
      <div className={styles.dataContainer}>
        <div className={styles.ordersContainer}>
          {orders.orders.map((item) => {
            return <OrderCard {...item} key={item._id} />;
          })}
          {isLoading && waiter}
        </div>
        {props.isStatisticDataWillShow && (
          <div className={styles.infoContainer}>
            <div className={styles.totalStatusContainer}>
              <div className={styles.statusContainer}>
                <h3 className="text text_type_main-medium">Готовы:</h3>
                <div className={styles.ordersNumbersContainer}>
                  {getStatusNumber('done').map((item) => {
                    return (
                      <span
                        className={`text text_type_digits-default ${styles.accentText}`}
                        key={item}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className={styles.statusContainer}>
                <h3 className="text text_type_main-medium">В работе:</h3>
                <div className={styles.ordersNumbersContainer}>
                  {getStatusNumber('pending').map((item) => {
                    return (
                      <span className={`text text_type_digits-default`} key={item}>
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.totalContainer}>
              <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
              <span className="text text_type_digits-large">{total}</span>
            </div>
            <div className={styles.totalContainer}>
              <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
              <span className="text text_type_digits-large">{totalToday}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
