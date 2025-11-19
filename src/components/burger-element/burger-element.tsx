import {
  delIngredient,
  reorderIngredients,
} from '@/services/constructor/burger-constructor-slice';
import { useAppDispatch } from '@/services/store';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

import type { TIngredient } from '@/utils/types';

import styles from './burger-element.module.css';

type TBurgerElementProps = {
  data: TIngredient;
};

export const BurgerElement = ({ data }: TBurgerElementProps): React.JSX.Element => {
  const itemId = data.itemId;
  const [, dragRef] = useDrag({
    type: 'burgerElement',
    item: { itemId, ...data },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const dispatch = useAppDispatch();

  const [, dropTarget] = useDrop({
    accept: 'burgerElement',
    drop(item) {
      const dragItemId = (item as TIngredient).itemId;
      if (dragItemId !== data.itemId) {
        dispatch(reorderIngredients({ sourceId: dragItemId, targetId: data.itemId }));
      }
    },
  });

  return (
    <div
      className={styles.element_container}
      key={data.itemId}
      ref={(el) => {
        dragRef(el);
        dropTarget(el);
      }}
    >
      <DragIcon type="primary" className={styles.sortIco} />
      <ConstructorElement
        key={data.itemId}
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={() => {
          dispatch(delIngredient({ ...data }));
        }}
      />
    </div>
  );
};
