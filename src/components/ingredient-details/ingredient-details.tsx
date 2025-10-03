import { useSelector } from 'react-redux';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-details.module.css';

export const IngredientDetails = (): React.JSX.Element => {
  const createPropElem = (name: string, val: number): React.JSX.Element => {
    return (
      <div className={styles.detail__prop}>
        <span className="text text_type_main-medium text_color_inactive">{name}</span>
        <span className="text text_type_digits-medium text_color_inactive">{val}</span>
      </div>
    );
  };

  const { component } = useSelector((store: Record<string, unknown>) => ({
    component: (store.component as Record<string, unknown>).component as TIngredient,
  }));

  return (
    <>
      <img
        className={styles.detail__image}
        src={component.image}
        alt={component.name}
      ></img>
      <p className={`${styles.detail__name} "text text_type_main-large pt-4 pb-8"`}>
        {component.name}
      </p>
      <div className={styles.detail__props_container as string}>
        {createPropElem('Калории,ккал', component.calories)}
        {createPropElem('Белки,г', component.proteins)}
        {createPropElem('Жиры,г', component.fat)}
        {createPropElem('Углеводы,г', component.carbohydrates)}
      </div>
    </>
  );
};
