import { MessageDialog } from '@/components/message-dialog/message-dialog';
import { Modal } from '@/components/modal/modal';
import { Waiter } from '@/components/waiter/waiter';
import { useAppDispatch, type RootStoreState } from '@/services/store';
import { login, setErrorText } from '@/services/user/user-slice';
import { RoutePath } from '@/utils/route-config';
import { errMessages } from '@/utils/validator';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from '../forms-styles.module.css';

export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const waiter = <Waiter />;
  const { isLoading, error } = useSelector((store: RootStoreState) => ({
    isLoading: store.user.isLoading,
    error: store.user.error,
  }));

  const modal = (
    <Modal
      onCloseEvent={() => {
        dispatch(setErrorText(''));
      }}
    >
      <MessageDialog messageType={'error'} message={`Ошибка при входе: ${error}`} />
    </Modal>
  );

  return (
    <div className={styles.mainContainer}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          void dispatch(login({ email: email, password: password }));
        }}
      >
        <h2 className="text text_type_main-medium">Вход</h2>
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
          errorText={errMessages.EMAIL_ERR}
        />
        <PasswordInput
          onChange={function (e: ChangeEvent<HTMLInputElement>): void {
            e.preventDefault();
            setPassword(e.target.value);
          }}
          value={password}
          name={'password'}
          extraClass="mb-2"
        />
        <Button htmlType="submit" type="primary" size="large">
          Войти
          {isLoading && waiter}
        </Button>
      </form>
      <div className={styles.linkContainer}>
        <div className={styles.buttonContainer}>
          <span className="text text_type_main-small">Вы - новый пользователь?</span>
          <Button
            extraClass={styles.button}
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={() => void navigate(RoutePath.register)}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles.buttonContainer}>
          <span className="text text_type_main-small">Забыли пароль?</span>
          <Button
            extraClass={styles.button}
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={() => void navigate(RoutePath.forgot_password)}
          >
            Восстановить пароль
          </Button>
        </div>
        {error && modal}
      </div>
    </div>
  );
};
