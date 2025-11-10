import { NotFoundErorPage } from '@/pages/error-page/error-page';
import { FeedOrder } from '@/pages/feed-order/feed-order';
import { Feed } from '@/pages/feed/feed';
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
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import { useAppDispatch } from '../../services/store';
import { BaseFeed } from '../base-feed/base-feed';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { ProfileEditForm } from '../profile-edit-form/profile-edit-form';
import { ProfileOrdersForm } from '../profile-orders-form/profile-orders-form';
import { Protected } from '../protected-route/protected-route';

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

  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(loadIngredients());
  }, []);

  const windowModal = <IngredientDetails />;

  const directModal = (
    <Modal caption="Детали ингридиента" onCloseEvent={handleModalClose}>
      <IngredientDetails />
    </Modal>
  );

  useEffect(() => {
    void dispatch(checkUserAuth());
  }, []);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <main className={`${styles.main} pl-5 pr-5`}>
          <Routes location={background || location}>
            <Route path={RoutePath.home} element={<Home />} />
            <Route path={RoutePath.main} element={<Home />} />
            <Route path={RoutePath.ingredients} element={windowModal} />
            <Route path={RoutePath.feed} element={<Feed />}>
              <Route path={RoutePath.feed} element={<BaseFeed />} />
              <Route path={RoutePath.feed_base} element={<BaseFeed />} />
              <Route path={RoutePath.feed_order} element={<FeedOrder />} />
            </Route>
            <Route path={RoutePath.not_found} element={<NotFoundErorPage />} />
            <Route
              path={RoutePath.reset_password}
              element={
                localStorage.getItem('canShowReset') === 'true' ? (
                  <ResetPassword />
                ) : (
                  <Home />
                )
              }
            />

            <Route
              path={RoutePath.register}
              element={<Protected element={<Register />} onlyAuth={false} />}
            ></Route>
            <Route
              path={RoutePath.login}
              element={<Protected element={<Login />} onlyAuth={false} />}
            ></Route>
            <Route
              path={RoutePath.forgot_password}
              element={<Protected element={<ForgotPassword />} onlyAuth={false} />}
            ></Route>
            <Route
              path={RoutePath.profile}
              element={<Protected element={<Profile />} onlyAuth />}
            >
              <Route path={RoutePath.profile} element={<ProfileEditForm />} />
              <Route path={RoutePath.profile_profile} element={<ProfileEditForm />} />
              <Route path={RoutePath.profile_orders} element={<ProfileOrdersForm />} />
            </Route>
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
