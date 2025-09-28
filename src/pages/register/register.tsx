import { errMessages } from '@/utils/validator';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type ChangeEvent } from 'react';

import styles from '../forms-styles.module.css';

export const Register = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className={styles.mainContainer}>
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
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={() => {
          alert(name);
        }}
      >
        Зарегистрироваться
      </Button>
      <div className={styles.linkContainer}>
        <div className={styles.buttonContainer}>
          <span className="text text_type_main-small">Уже зарегистрированы?</span>
          <Button
            extraClass={styles.button}
            htmlType="button"
            type="secondary"
            size="medium"
          >
            Войти
          </Button>
        </div>
      </div>
    </div>
  );
};
