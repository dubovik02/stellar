import { MessageDialog } from '@/components/message-dialog/message-dialog';
import { Modal } from '@/components/modal/modal';
import { Waiter } from '@/components/waiter/waiter';
import { useAppDispatch, type RootStoreState } from '@/services/store';
import { setErrorText } from '@/services/user/user-slice';
import { passwordResetReset } from '@/utils/api';
import { RoutePath } from '@/utils/route-config';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from '../forms-styles.module.css';

export const ResetPassword = (): React.JSX.Element => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => localStorage.setItem('canShowReset', 'false'), []);

  const dispatch = useAppDispatch();

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
      <MessageDialog
        messageType={'error'}
        message={`Ошибка при смене пароля: ${error}`}
      />
    </Modal>
  );

  return (
    <div className={styles.mainContainer}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          const res = passwordResetReset(password, code);
          if (res instanceof Promise) {
            void res
              .then(() => {
                alert('Пароль успешно изменен!');
                void navigate(RoutePath.login);
              })
              .catch((err: Record<string, unknown>) => {
                dispatch(setErrorText((err.message as string) ?? 'неизвестная ошибка'));
              });
          } else {
            dispatch(setErrorText(res));
          }
        }}
      >
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <PasswordInput
          onChange={function (e: ChangeEvent<HTMLInputElement>): void {
            e.preventDefault();
            setPassword(e.target.value);
          }}
          placeholder={'Введите новый пароль'}
          value={password}
          name={'password'}
          extraClass="mb-2"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          name={'name'}
          size={'default'}
          extraClass="ml-1"
          value={code}
          onChange={function (e: ChangeEvent<HTMLInputElement>): void {
            e.preventDefault();
            setCode(e.target.value);
          }}
        />
        <Button htmlType="submit" type="primary" size="large">
          Сохранить
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
