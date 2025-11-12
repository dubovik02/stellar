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
import properties from '@/utils/properties';
import { RoutePath } from '@/utils/route-config';
import { CONNECT_MODE } from '@/utils/types';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import { useAppDispatch } from '../../services/store';
import { BaseFeed } from '../base-feed/base-feed';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { OrderCardFull } from '../order-card-full/order-card-full';
import { ProfileEditForm } from '../profile-edit-form/profile-edit-form';
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

  const orderModal = (
    <Modal caption="" onCloseEvent={handleModalClose} isContainerSlim={true}>
      <OrderCardFull />
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
              <Route
                path={RoutePath.feed}
                element={
                  <BaseFeed
                    wssUrl={
                      properties.websocket.baseUrl + properties.websocket.ordersAll
                    }
                    isStatisticDataWillShow={true}
                    connectMode={CONNECT_MODE.FEED}
                  />
                }
              />
              <Route
                path={RoutePath.feed_base}
                element={
                  <BaseFeed
                    wssUrl={
                      properties.websocket.baseUrl + properties.websocket.ordersAll
                    }
                    isStatisticDataWillShow={true}
                    connectMode={CONNECT_MODE.FEED}
                  />
                }
              />
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
              <Route
                path={RoutePath.profile_orders}
                element={
                  <BaseFeed
                    wssUrl={
                      properties.websocket.baseUrl +
                      properties.websocket.usersOrders +
                      `/?token=${localStorage.getItem('accessToken')?.split(' ')[1]}`
                    }
                    isStatisticDataWillShow={false}
                    connectMode={CONNECT_MODE.USER_FEED}
                  />
                }
              />
            </Route>
          </Routes>

          {background && (
            <Routes>
              <Route path="/ingredients/:ingredientId" element={directModal} />
              <Route path="/feed/:feedId" element={orderModal} />
            </Routes>
          )}
        </main>
      </div>
    </>
  );
};

export default App;
