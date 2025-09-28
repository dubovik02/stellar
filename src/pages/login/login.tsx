import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type ChangeEvent } from 'react';

import styles from '../forms-styles.module.css';

export const Login = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.mainContainer}>
      <h2 className="text text_type_main-medium">Вход</h2>
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
      <Button htmlType="button" type="primary" size="large">
        Войти
      </Button>
      <div className={styles.linkContainer}>
        <div className={styles.buttonContainer}>
          <span className="text text_type_main-small">Вы - новый пользователь?</span>
          <Button
            extraClass={styles.button}
            htmlType="button"
            type="secondary"
            size="medium"
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
          >
            Восстановить пароль
          </Button>
        </div>
      </div>
    </div>
  );
};
