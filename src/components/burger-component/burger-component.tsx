import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import type { RootStoreState } from '@/services/store';
import type { TIngredient } from '@/utils/types';
import type { Ref } from 'react';

import styles from './burger-component.module.css';

export const BurgerComponent = (props: TIngredient): React.JSX.Element => {
  const location = useLocation();

  const itemId = uuidv4();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { itemId, ...props },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const { bun, mainAndSauce } = useSelector((store: RootStoreState) => ({
    bun: store.constructorBuilder.bun,
    mainAndSauce: store.constructorBuilder.mainAndSauce,
  }));

  let currentIngredients: TIngredient[] = [];
  if (bun) {
    currentIngredients.push(bun);
    currentIngredients.push(bun);
  }
  currentIngredients = currentIngredients.concat(mainAndSauce);
  const countOfUse = currentIngredients.filter((item) => item._id === props._id).length;
  const counter = <Counter count={countOfUse} size="default" extraClass="m-1" />;

  return (
    <Link
      key={props._id}
      to={`/ingredients/${props._id}`}
      state={{ background: location }}
      className={styles.link}
      ref={dragRef as unknown as Ref<HTMLAnchorElement>}
    >
      <div className={styles.card}>
        {countOfUse > 0 && counter}
        <img src={props.image} alt={props.name}></img>
        <div className={`${styles.priceContainer} m-1`}>
          <span className={styles.price}>{props.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <span className={`${styles.name}`}>{props.name}</span>
      </div>
    </Link>
  );
};
