import { NotFoundErorPage } from '@/pages/error-page/error-page';
import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { Login } from '@/pages/login/login';
import { Profile } from '@/pages/profile/profile';
import { Register } from '@/pages/register/register';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { loadIngredients } from '@/services/ingredients/burger-ingredients-slice';
import { checkUserAuth } from '@/services/user/user-slice';
import { RoutePath } from '@/utils/route-config';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { Protected } from '../protected-route/protected-route';

import type { UnknownAction } from '@reduxjs/toolkit';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const background =
    (location.state as Record<string, unknown>) &&
    ((location.state as Record<string, unknown>)?.background as string);

  const handleModalClose = (): void => {
    void navigate(-1);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadIngredients() as unknown as UnknownAction);
  }, []);

  const windowModal = <IngredientDetails />;

  const directModal = (
    <Modal caption="Детали ингридиента" onCloseEvent={handleModalClose}>
      <IngredientDetails />
    </Modal>
  );

  useEffect(() => {
    dispatch(checkUserAuth() as unknown as UnknownAction);
  }, []);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <main className={`${styles.main} pl-5 pr-5`}>
          <Routes location={background || location}>
            <Route path={RoutePath.home} element={<Home />} />
            <Route path={RoutePath.main} element={<Home />} />
            <Route path={RoutePath.register} element={<Register />} />
            <Route path={RoutePath.login} element={<Login />} />
            <Route
              path={RoutePath.forgot_password}
              element={<Protected element={<ForgotPassword />} onlyUnAuth />}
            />
            <Route
              path={RoutePath.reset_password}
              element={<Protected element={<ResetPassword />} onlyUnAuth />}
            />
            <Route
              path={RoutePath.profile}
              element={<Protected element={<Profile />} onlyUnAuth />}
            />
            <Route path={RoutePath.ingredients} element={windowModal} />
            <Route path={RoutePath.not_found} element={<NotFoundErorPage />} />
          </Routes>

          {background && (
            <Routes>
              <Route path="/ingredients/:ingredientId" element={directModal} />
            </Routes>
          )}
        </main>
      </div>
    </>
  );
};

export default App;
