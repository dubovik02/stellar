import { loadOrder } from '@/services/order-details/order-details-slice';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../stub.svg';
import { BurgerElement } from '../app/burger-element/burger-element';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { Waiter } from '../waiter/waiter';

import type { UnknownAction } from '@reduxjs/toolkit';
import type { TIngredient } from '@utils/types';
import type { Ref } from 'react';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  function handleOrderClick(): void {
    if (bun === null) {
      alert('Без булки куска везде тоска! Добавьте булку - так вкуснее!');
      return;
    }
    if (mainAndSauce.length === 0) {
      alert('Только булкой сыт не будешь! Добавьте начинку и соусы!');
      return;
    }
    const orderData: string[] = [];
    totalIngredients.forEach((item) => {
      orderData.push(item._id);
    });
    const order: Record<string, unknown> = {
      ingredients: orderData,
    };

    dispatch(loadOrder(order) as unknown as UnknownAction);
  }

  const dispatch = useDispatch();

  const modal = (
    <Modal
      onCloseEvent={() => {
        dispatch({ type: 'order/hideOrderModal' });
      }}
    >
      <OrderDetails></OrderDetails>
    </Modal>
  );

  const waiter = <Waiter />;

  const { isLoading, isModalShow } = useSelector((store: Record<string, unknown>) => ({
    isModalShow: (store.order as Record<string, unknown>).isModalShow as boolean,
    isLoading: (store.order as Record<string, unknown>).isLoading as boolean,
  }));

  const { bun, mainAndSauce } = useSelector((store: Record<string, unknown>) => ({
    bun: (store.constructorBuilder as Record<string, unknown>).bun as TIngredient,
    mainAndSauce: (store.constructorBuilder as Record<string, unknown>)
      .mainAndSauce as TIngredient[],
  }));

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      if ((item as TIngredient).type === 'bun') {
        dispatch({
          type: 'constructorBuilder/addBun',
          payload: { ...(item as TIngredient) },
        });
      } else {
        dispatch({
          type: 'constructorBuilder/addIngredient',
          payload: { ...(item as TIngredient) },
        });
      }
    },
  });

  let totalIngredients: TIngredient[] = [];
  if (bun) {
    totalIngredients.push(bun);
    totalIngredients.push(bun);
  }
  totalIngredients = totalIngredients.concat(mainAndSauce);

  const totalPrice = useMemo(() => {
    return totalIngredients.reduce((sum, current) => (sum = sum + current.price), 0);
  }, [totalIngredients]);

  const priceContainer = (
    <div className={styles.summury__price_container}>
      <p className={styles.summury__price}>{totalPrice.toLocaleString()}</p>
      <CurrencyIcon className={styles.summury__currency_ico} type="primary" />
    </div>
  );

  return (
    <section className={styles.burger__constructor}>
      <div
        className={styles.cards__container}
        ref={dropTarget as unknown as Ref<HTMLDivElement>}
      >
        <div className={styles.cards__main}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={(bun?.name ?? '') + (bun?.name ? ' (верх)' : '')}
            price={bun?.price ?? ''}
            thumbnail={bun?.image ?? logo}
          />
        </div>

        <div className={styles.cards__container_filling}>
          {mainAndSauce.map((item) => {
            return <BurgerElement data={item} key={item.itemId} />;
          })}
        </div>
        <div className={styles.cards__main}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={(bun?.name ?? '') + (bun?.name ? ' (низ)' : '')}
            price={bun?.price ?? ''}
            thumbnail={bun?.image ?? logo}
          />
        </div>
      </div>
      <div className={styles.summury_container}>
        {totalPrice > 0 && priceContainer}
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
          {isLoading && waiter}
        </Button>
        {isModalShow && modal}
      </div>
    </section>
  );
};
