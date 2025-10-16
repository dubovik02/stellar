import { updateUserProfile } from '@/services/user/user-slice';
import { errMessages } from '@/utils/validator';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MessageDialog } from '../message-dialog/message-dialog';
import { Modal } from '../modal/modal';
import { Waiter } from '../waiter/waiter';

import type { TStore } from '@/utils/types';
import type { UnknownAction } from '@reduxjs/toolkit';

import customStyles from './profile-edit-form.module.css';

export const ProfileEditForm = (): React.JSX.Element => {
  const { user, isLoading, error } = useSelector((store: TStore) => ({
    user: store.user.user,
    isLoading: store.user.isLoading,
    error: store.user.error,
  }));
  const [name, setName] = useState(user!.name ?? '');
  const [email, setEmail] = useState(user!.email);
  const [password, setPassword] = useState('');

  const waiter = <Waiter />;

  const dispatch = useDispatch();

  const modal = (
    <Modal
      onCloseEvent={() => {
        dispatch({ type: 'user/setErrorText', payload: '' });
      }}
    >
      <MessageDialog messageType={'error'} message={`Ошибка при входе: ${error}`} />
    </Modal>
  );

  return (
    <form
      className={customStyles.fieldContainer}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(
          updateUserProfile({
            name: name,
            email: email,
            password: password,
          }) as unknown as UnknownAction
        );
      }}
    >
      <Input
        type={'text'}
        placeholder={'Имя'}
        name={'name'}
        size={'default'}
        extraClass="ml-1"
        value={name}
        icon={'EditIcon'}
        onChange={function (e: ChangeEvent<HTMLInputElement>): void {
          e.preventDefault();
          setName(e.target.value);
        }}
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
      />
      <Button htmlType="submit" type="primary" size="large">
        Изменить
        {isLoading && waiter}
      </Button>
      {error && modal}
    </form>
  );
};
