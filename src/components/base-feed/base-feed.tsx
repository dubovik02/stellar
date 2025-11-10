import { OrderCard } from '@/components/order-card/order-card';
import { Waiter } from '@/components/waiter/waiter';
import { connect } from '@/services/feed/feed-actions';
import { useAppDispatch } from '@/services/store';
import properties from '@/utils/properties';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { RootStoreState } from '@/services/store';

import styles from './base-feed.module.css';

export const BaseFeed = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connect(properties.websocket.baseUrl + properties.websocket.ordersAll));
  }, []);

  const { orders, isLoading } = useSelector((store: RootStoreState) => ({
    orders: store.feed.data,
    isLoading: store.feed.isLoading,
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

  const waiter = <Waiter />;

  return (
    <>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <div className={styles.dataContainer}>
        <div className={styles.ordersContainer}>
          {orders.orders.map((item) => {
            return <OrderCard {...item} key={item._id} />;
          })}
          {isLoading && waiter}
        </div>
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
            <span className="text text_type_digits-large">{orders.total}</span>
          </div>
          <div className={styles.totalContainer}>
            <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
            <span className="text text_type_digits-large">{orders.totalToday}</span>
          </div>
        </div>
      </div>
    </>
  );
};
