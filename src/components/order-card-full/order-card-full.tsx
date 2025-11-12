import { loadDetailOrder } from '@/services/detail-order/detail-order-slice';
import { useAppDispatch } from '@/services/store';
import { createDataString, createStatus, totalPrice } from '@/utils/order-card-utils';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Waiter } from '../waiter/waiter';

import type { RootStoreState } from '@/services/store';
import type { TIngredient, TOrderFeed } from '@/utils/types';

import styles from './order-card-full.module.css';

export const OrderCardFull = (): React.JSX.Element => {
  const emptyOrder: TOrderFeed = {
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    number: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const { ingredients } = useSelector((store: RootStoreState) => ({
    ingredients: store.ingredients.data,
  }));

  const urlId = useLocation();
  const orderNumb = urlId.pathname.split('/')[2];

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(loadDetailOrder(orderNumb));
  }, []);

  const { order, isLoading } = useSelector((store: RootStoreState) => ({
    order: store.detailOrder.orders[0] ? store.detailOrder.orders[0] : emptyOrder,
    isLoading: store.detailOrder.isLoading,
  }));

  const createElements = (): React.JSX.Element => {
    let currentIngredients: TIngredient[] = [];
    order.ingredients.forEach((ingId) => {
      ingredients.forEach((item) => {
        if (item._id === ingId) {
          currentIngredients.push(item);
        }
      });
    });

    const uniqueSet = new Set(currentIngredients);
    let uniqIngredients = [...uniqueSet];

    currentIngredients = currentIngredients.sort((itemA, itemB) => {
      return itemA.type > itemB.type ? 1 : -1;
    });

    uniqIngredients = uniqIngredients.sort((itemA, itemB) => {
      return itemA.type > itemB.type ? 1 : -1;
    });

    return (
      <>
        {uniqIngredients.map((item) => {
          return (
            <div className={styles.elementContainer} key={item._id}>
              <img
                className={styles.ingredientImage}
                src={item.image_mobile}
                alt={item.name}
                key={item._id}
              />
              <span className={`text text_type_main-default`}>{item.name}</span>
              {createElementsPrice(item._id, currentIngredients)}
            </div>
          );
        })}
      </>
    );
  };

  const createElementsPrice = (
    ingredientID: string,
    currentIngredients: TIngredient[]
  ): React.JSX.Element => {
    const elementArr = currentIngredients.filter((currentItem) => {
      return ingredientID === currentItem._id;
    });
    return (
      <>
        <div className={styles.priceContainer} key={elementArr[0]._id}>
          <span className="text text_type_digits-default">{`${elementArr.length}`}</span>
          <span className="text text_type_digits-default">{'X'}</span>
          <span className="text text_type_digits-default">{`${elementArr[0].price}`}</span>
          <CurrencyIcon type="primary" />
        </div>
      </>
    );
  };

  const waiter = <Waiter />;

  return (
    <div className={styles.baseOrderContainer}>
      {isLoading && waiter}

      {!isLoading && (
        <>
          <span
            className={`text text_type_digits-default ${styles.orderNumber}`}
          >{`#${order.number}`}</span>
          <span className={`text text_type_main-medium`}>{`${order.name}`}</span>
          <span
            className={`text text_type_main-default ${styles.orderStatus}`}
          >{`${createStatus(order.status)}`}</span>
          <span className={`text text_type_main-medium`}>{`Состав:`}</span>
          <div className={styles.ingredientsContainer}>{createElements()}</div>
          <div className={styles.datePriceContainer}>
            <span className="text text_type_main-default text_color_inactive">
              {createDataString(new Date(order.createdAt))}
            </span>
            <div className={styles.totalPriceContainer}>
              <span className="text text_type_digits-default">{`${totalPrice(ingredients, order.ingredients).toLocaleString()}`}</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
