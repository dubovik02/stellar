import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

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

  const modal = <OrderDetails onCloseEvent={handleOrderDetailsClose} />;

  return (
    <section className={styles.burger__constructor}>
      <div className={styles.cards__container}>
        <div className={styles.cards__main}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/cheese.png"
          />
        </div>
        <div className={styles.cards__container_filling}>
          {ingredients.map((item) => {
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
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/cheese.png"
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
