// import BaseApi from '@/api/base-api';
// import properties from '@/utils/properties';
// import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type { TIngredient } from '@/utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const ingredients: TIngredient[] = [];
  // const [ingredients, setIngredients] = useState([] as TIngredient[]);

  // useEffect(() => {
  //   new BaseApi()
  //     .getIngridients(properties.api.ingredientsUrl)
  //     .then((res) => {
  //       if (typeof res === 'object' && res && 'data' in res) {
  //         const arrIng = res.data as TIngredient[];
  //         setIngredients(arrIng);
  //       } else {
  //         setIngredients([]);
  //       }
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // }, []);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients ingredients={[]} />
          <BurgerConstructor ingredients={ingredients} />
        </main>
      </div>
    </>
  );
};

export default App;
