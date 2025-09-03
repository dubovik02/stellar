import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useState, type SyntheticEvent } from 'react';

import { IngredientDetails } from '../ingredient-details/ingredient-details';

import type { TIngredient } from '@/utils/types';

import styles from './burger-component.module.css';

export const BurgerComponent = (props: TIngredient): React.JSX.Element => {
  const [modalPropVisible, setModalPropVisible] = useState(false);

  function handleIngredientClick(): void {
    setModalPropVisible(true);
  }

  function handleIngredientClose(): void {
    setModalPropVisible(false);
  }

  const modal = <IngredientDetails data={props} onCloseEvent={handleIngredientClose} />;

  return (
    <>
      <div
        className={styles.card}
        onClick={(event: SyntheticEvent) => {
          event.stopPropagation();
          handleIngredientClick();
        }}
      >
        <Counter count={0} size="default" extraClass="m-1" />
        <img src={props.image} alt="picture"></img>
        <div className={`${styles.priceContainer} m-1`}>
          <span className={styles.price}>{props.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <span className={`${styles.name}`}>{props.name}</span>
      </div>
      {modalPropVisible && modal}
    </>
  );
};
