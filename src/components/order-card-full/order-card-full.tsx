import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import type { RootStoreState } from '@/services/store';

import styles from './order-card-full.module.css';

export const OrderCardFull = (): React.JSX.Element => {
  const urlId = useLocation();
  const orderId = urlId.pathname.split('/')[2];

  const { orders } = useSelector((store: RootStoreState) => ({
    orders: store.feed.data,
  }));

  console.log(orderId + ' ' + orders.total); ////////////////////

  return (
    <div className={styles.baseOrderContainer}>
      <span
        className={`text text_type_digits-default ${styles.orderNumber}`}
      >{`#${12345}`}</span>
      <span className={`text text_type_main-medium`}>{`${'qwerty ytrewq'}`}</span>
      <span
        className={`text text_type_main-default ${styles.orderStatus}`}
      >{`${'proceed'}`}</span>
      <span className={`text text_type_main-medium`}>{`Состав:`}</span>
      <div className={styles.ingredientsContainer}>
        <div className={styles.elementContainer}>
          <img
            className={styles.ingredientImage}
            src={'https://code.s3.yandex.net/react/code/salad-mobile.png'}
            alt={`item.type`}
            key={`item._id`}
          />
          <span
            className={`text text_type_main-default`}
          >{`fsdfdsfasdfasdf dfdsfdasfd`}</span>
          <div className={styles.priceContainer}>
            <span className="text text_type_digits-default">{`${'3'}`}</span>
            <span className="text text_type_digits-default">{'X'}</span>
            <span className="text text_type_digits-default">{`${'12'}`}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
      <div className={styles.datePriceContainer}>
        <span className="text text_type_main-default text_color_inactive">{`${'Вчерась, 12:33:08'}`}</span>
        <div className={styles.totalPriceContainer}>
          <span className="text text_type_digits-default">{`${'12345'}`}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
