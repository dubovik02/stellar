import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import type { RootStoreState } from '@/services/store';
import type { TOrderFeed } from '@/utils/types';

import styles from './order-card.module.css';

export const OrderCard = (props: TOrderFeed): React.JSX.Element => {
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

  const totalPrice = (): number => {
    const currentIngredients = ingredients.filter((item) => {
      return props.ingredients.includes(item._id);
    });
    let sum = 0;
    currentIngredients.forEach((item) => {
      if (item.type === 'bun') {
        sum = sum + 2 * item.price;
      } else {
        sum = sum + item.price;
      }
    });
    return sum;
  };

  const createStatus = (status: string): string => {
    switch (status) {
      case 'done':
        return 'Выполнен';
      case 'created':
        return 'Создается';
      case 'pending':
        return 'Выполняется';
      default:
        return status;
    }
  };

  const createDataString = (date: Date): string => {
    if (date.getDate() === new Date(Date.now()).getDate()) {
      const timeStr =
        (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) +
        ':' +
        (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) +
        ':' +
        (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds());
      return `Сегодня, ${timeStr}`;
    }
    return date.toLocaleString();
  };

  return (
    <Link
      key={props._id}
      to={`/feed/${props._id}`}
      // state={{ background: location }}
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
            <span className="text text_type_digits-default">{`${totalPrice().toLocaleString()}`}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};
