import { MessageDialog } from '@/components/message-dialog/message-dialog';
import { Modal } from '@/components/modal/modal';
import { Waiter } from '@/components/waiter/waiter';
import { newUserRegister } from '@/services/user/user-slice';
import { RoutePath } from '@/utils/route-config';
import { errMessages } from '@/utils/validator';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import type { UnknownAction } from '@reduxjs/toolkit';

import styles from '../forms-styles.module.css';

export const Register = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        message={`Ошибка при регистрации: ${error}`}
      />
    </Modal>
  );

  return (
    <div className={styles.mainContainer}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            newUserRegister({
              name: name,
              email: email,
              password: password,
            }) as unknown as UnknownAction
          );
        }}
      >
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          size={'default'}
          extraClass="ml-1"
          value={name}
          onChange={function (e: ChangeEvent<HTMLInputElement>): void {
            e.preventDefault();
            setName(e.target.value);
          }}
          errorText={errMessages.NAME_ERR}
        />
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
          errorText={errMessages.PASSWORD_ERR}
        />
        <Button htmlType="submit" type="primary" size="large">
          Зарегистрироваться
          {isLoading && waiter}
        </Button>
      </form>
      <div className={styles.linkContainer}>
        <div className={styles.buttonContainer}>
          <span className="text text_type_main-small">Уже зарегистрированы?</span>
          <Button
            extraClass={styles.button}
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={(): void =>
              void (async (): Promise<void> => await navigate(RoutePath.login))
            }
          >
            Войти
          </Button>
          {error && modal}
        </div>
      </div>
    </div>
  );
};
