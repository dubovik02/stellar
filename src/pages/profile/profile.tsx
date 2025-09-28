import { Input, PasswordInput } from '@krgaa/react-developer-burger-ui-components';
import { useState, type ChangeEvent } from 'react';

import customStyles from './profile.module.css';

export const Profile = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={customStyles.rootContainer}>
      <div className={customStyles.menuContainer}>
        <li className={`${customStyles.menuItem} text text_type_main-medium`}>
          Профиль
        </li>
        <li
          className={`${customStyles.menuItem} text text_type_main-medium text_color_inactive`}
        >
          История заказов
        </li>
        <li
          className={`${customStyles.menuItem} text text_type_main-medium text_color_inactive`}
        >
          Выход
        </li>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={customStyles.fieldContainer}>
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
        <Input
          type={'text'}
          placeholder={'Логин'}
          name={'login'}
          size={'default'}
          extraClass="ml-1"
          value={login}
          icon={'EditIcon'}
          onChange={function (e: ChangeEvent<HTMLInputElement>): void {
            e.preventDefault();
            setLogin(e.target.value);
          }}
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
      </div>
    </div>
  );
};
