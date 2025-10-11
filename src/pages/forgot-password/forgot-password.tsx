import { MessageDialog } from '@/components/message-dialog/message-dialog';
import { Modal } from '@/components/modal/modal';
import { Waiter } from '@/components/waiter/waiter';
import { passwordReset } from '@/utils/api';
import { RoutePath } from '@/utils/route-config';
import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useState, type ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from '../forms-styles.module.css';

export const ForgotPassword = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const waiter = <Waiter />;
  const { isLoading, error } = useSelector((store: Record<string, unknown>) => ({
    isLoading: (store.user as Record<string, unknown>).isLoading as boolean,
    error: (store.user as Record<string, unknown>).error as string,
  }));

  const modal = (
    <Modal
      onCloseEvent={() => {
        dispatch({ type: 'user/setErrorText', payload: '' });
      }}
    >
      <MessageDialog
        messageType={'error'}
        message={`Ошибка при запросе кода: ${error}`}
      />
    </Modal>
  );

  return (
    <div className={styles.mainContainer}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          const res = passwordReset(email);
          if (res instanceof Promise) {
            void res
              .then(() => {
                localStorage.setItem('canShowReset', 'true');
                void navigate(RoutePath.reset_password);
              })
              .catch((err: Record<string, unknown>) => {
                dispatch({
                  type: 'user/setErrorText',
                  payload: err.message ?? 'неизвестная ошибка',
                });
              });
          } else {
            dispatch({
              type: 'user/setErrorText',
              payload: res,
            });
          }
        }}
      >
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput
          placeholder={'E-mail'}
          name={'email'}
          value={email}
          onChange={function (e: ChangeEvent<HTMLInputElement>): void {
            e.preventDefault();
            setEmail(e.target.value);
          }}
          isIcon={true}
          extraClass="mb-2"
        />
        <Button htmlType="submit" type="primary" size="large">
          Восстановить
          {isLoading && waiter}
        </Button>
      </form>
      <div className={styles.linkContainer}>
        <div className={styles.buttonContainer}>
          <span className="text text_type_main-small">Вспомнили пароль?</span>
          <Button
            extraClass={styles.button}
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={() => void navigate(RoutePath.login)}
          >
            Войти
          </Button>
        </div>
        {error && modal}
      </div>
    </div>
  );
};
