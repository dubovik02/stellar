import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);

  function handleOrderClick(): void {
    setModalVisible(true);
  }

  function handleOrderDetailsClose(): void {
    setModalVisible(false);
  }

  const modal = <Modal onCloseEvent={handleOrderDetailsClose}>{<OrderDetails />}</Modal>;

  const bun = ingredients.find((item) => {
    return item.type === 'bun';
  });

  const mainAndSauce = ingredients.filter((item) => {
    return item.type != 'bun';
  });

  return (
    <section className={styles.burger__constructor}>
      <div className={styles.cards__container}>
        <div className={styles.cards__main}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={(bun?.name ?? '') + ' (верх)'}
            price={(bun?.price ?? '') as number}
            thumbnail={bun?.image ?? 'null'}
          />
        </div>
        <div className={styles.cards__container_filling}>
          {mainAndSauce.map((item) => {
            return (
              <ConstructorElement
                key={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            );
          })}
        </div>
        <div className={styles.cards__main}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={(bun?.name ?? '') + ' (низ)'}
            price={(bun?.price ?? '') as number}
            thumbnail={bun?.image ?? 'null'}
          />
        </div>
      </div>
      <div className={styles.summury_container}>
        <div className={styles.summury__price_container}>
          <p className={styles.summury__price}>{1234}</p>
          <CurrencyIcon className={styles.summury__currency_ico} type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
        {modalVisible && modal}
      </div>
    </section>
  );
};
