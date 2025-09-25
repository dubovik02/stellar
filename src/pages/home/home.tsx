import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import BurgerIngredients from '@/components/burger-ingredients/burger-ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './home.module.css';

export const Home = (): React.JSX.Element => {
  return (
    <>
      <div className={styles.rootContainer}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        <div className={styles.boardContainer}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </div>
    </>
  );
};
