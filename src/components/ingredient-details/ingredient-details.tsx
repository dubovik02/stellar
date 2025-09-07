import type { TIngredient } from '@/utils/types';

import styles from './ingredient-details.module.css';

export const IngredientDetails = (props: TIngredient): React.JSX.Element => {
  const createPropElem = (name: string, val: number): React.JSX.Element => {
    return (
      <div className={styles.detail__prop}>
        <span className="text text_type_main-medium text_color_inactive">{name}</span>
        <span className="text text_type_digits-medium text_color_inactive">{val}</span>
      </div>
    );
  };

  return (
    <>
      <img className={styles.detail__image} src={props.image} alt={props.name}></img>
      <p className={`${styles.detail__name} "text text_type_main-large pt-4 pb-8"`}>
        {props.name}
      </p>
      <div className={styles.detail__props_container as string}>
        {createPropElem('Калории,ккал', props.calories)}
        {createPropElem('Белки,г', props.proteins)}
        {createPropElem('Жиры,г', props.fat)}
        {createPropElem('Углеводы,г', props.carbohydrates)}
      </div>
    </>
  );
};
