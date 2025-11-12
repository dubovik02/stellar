import { createDataString, createStatus, totalPrice } from '@/utils/order-card-utils';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import type { RootStoreState } from '@/services/store';
import type { TOrderFeed } from '@/utils/types';

import styles from './order-card.module.css';

export const OrderCard = (props: TOrderFeed): React.JSX.Element => {
  const location = useLocation();

  const { ingredients } = useSelector((store: RootStoreState) => ({
    ingredients: store.ingredients.data,
  }));

  const createImg = (): React.JSX.Element => {
    let currentIngredients = ingredients.filter((item) => {
      return props.ingredients.includes(item._id);
    });

    const uniqueSet = new Set(currentIngredients);

    currentIngredients = [...uniqueSet];
    currentIngredients = currentIngredients.sort((itemA, itemB) => {
      return itemA.type > itemB.type ? 1 : -1;
    });

    if (currentIngredients.length > 6) {
      currentIngredients.splice(6, currentIngredients.length - 6);
    }

    return (
      <>
        {currentIngredients.map((item) => {
          return (
            <img
              className={styles.ingredientImage}
              src={item.image_mobile}
              alt={item.type}
              key={item._id}
            />
          );
        })}
      </>
    );
  };

  return (
    <Link
      key={props._id}
      to={`${location.pathname}/${props.number}`}
      state={{ background: location }}
      className={styles.link}
    >
      <div className={styles.mainContainer}>
        <div className={styles.timeNumberContainer}>
          <span className="text text_type_digits-default">{`#${props.number}`}</span>
          <span className="text text_type_main-default text_color_inactive">{`${createDataString(new Date(props.createdAt))}`}</span>
        </div>
        <span className={`text text_type_main-medium`}>{`${props.name}`}</span>
        <span className="text text_type_main-default">{`${createStatus(props.status)}`}</span>
        <div className={styles.ingredientsContainer}>
          <div className={styles.imageContainer}>{createImg()}</div>
          <div className={styles.priceContainer}>
            <span className="text text_type_digits-default">{`${totalPrice(ingredients, props.ingredients).toLocaleString()}`}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};
