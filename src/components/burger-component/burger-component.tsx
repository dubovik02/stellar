import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import type { TIngredient } from '@/utils/types';
import type { Ref, SyntheticEvent } from 'react';

import styles from './burger-component.module.css';

export const BurgerComponent = (props: TIngredient): React.JSX.Element => {
  const dispatch = useDispatch();

  const itemId = uuidv4();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { itemId, ...props },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const { bun, mainAndSauce } = useSelector((store: Record<string, unknown>) => ({
    bun: (store.constructorBuilder as Record<string, unknown>).bun as TIngredient,
    mainAndSauce: (store.constructorBuilder as Record<string, unknown>)
      .mainAndSauce as TIngredient[],
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
    <>
      <div
        className={styles.card}
        onClick={(event: SyntheticEvent) => {
          event.stopPropagation();
          dispatch({ type: 'component/showComponent', payload: props });
        }}
        ref={dragRef as unknown as Ref<HTMLDivElement>}
      >
        {countOfUse > 0 && counter}
        <img src={props.image} alt={props.name}></img>
        <div className={`${styles.priceContainer} m-1`}>
          <span className={styles.price}>{props.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <span className={`${styles.name}`}>{props.name}</span>
      </div>
    </>
  );
};
