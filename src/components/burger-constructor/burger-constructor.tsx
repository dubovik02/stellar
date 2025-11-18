import {
  addBun,
  addIngredient,
  clearAll,
} from '@/services/constructor/burger-constructor-slice';
import {
  hideErorrModal,
  hideOrderModal,
  loadOrder,
} from '@/services/order-details/order-details-slice';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { selectUser } from '@/services/user/user-slice';
import { RoutePath } from '@/utils/route-config';
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import logo from '../../pictures/stub.svg';
import { BurgerElement } from '../burger-element/burger-element';
import { MessageDialog } from '../message-dialog/message-dialog';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { Waiter } from '../waiter/waiter';

import type { TIngredient, TOrderData } from '@utils/types';
import type { Ref } from 'react';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  function handleOrderClick(): void {
    if (bun === null) {
      alert('Без булки куска везде тоска! Добавьте булку - так вкуснее!');
      return;
    }
    if (mainAndSauce.length === 0) {
      alert('Только булкой сыт не будешь! Добавьте начинку и соусы!');
      return;
    }
    if (!user) {
      void navigate(RoutePath.login);
      return;
    }
    const orderData: string[] = [];
    totalIngredients.forEach((item) => {
      orderData.push(item._id);
    });
    const order: TOrderData = {
      ingredients: orderData,
    };

    void dispatch(loadOrder(order));
  }

  const dispatch = useAppDispatch();

  const modal = (
    <Modal
      onCloseEvent={() => {
        dispatch(hideOrderModal());
        dispatch(clearAll());
      }}
    >
      <OrderDetails></OrderDetails>
    </Modal>
  );

  const waiter = <Waiter />;

  const { isLoading, isModalShow, error } = useAppSelector((store) => ({
    isModalShow: store.order.isModalShow,
    isLoading: store.order.isLoading,
    error: store.order.error,
  }));

  const errorModal = (
    <Modal
      onCloseEvent={() => {
        dispatch(hideErorrModal());
      }}
    >
      <MessageDialog
        messageType={'error'}
        message={`Ошибка при формировании заказа: ${error}`}
      />
    </Modal>
  );

  const { bun, mainAndSauce } = useAppSelector((store) => ({
    bun: store.constructorBuilder.bun,
    mainAndSauce: store.constructorBuilder.mainAndSauce,
  }));

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      if ((item as TIngredient).type === 'bun') {
        dispatch(addBun(item as TIngredient));
      } else {
        dispatch(addIngredient({ ...(item as TIngredient) }));
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
        data-card-test={'constructor'}
      >
        <div className={styles.cards__main}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={(bun?.name ?? '') + (bun?.name ? ' (верх)' : '')}
            price={bun?.price ?? 0}
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
            price={bun?.price ?? 0}
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
      {error && errorModal}
    </section>
  );
};
