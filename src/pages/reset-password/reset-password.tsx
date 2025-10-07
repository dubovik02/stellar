import { RoutePath } from '@/utils/route-config';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../forms-styles.module.css';

export const ResetPassword = (): React.JSX.Element => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <div className={styles.mainContainer}>
      <form className={styles.form}>
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
        <Button htmlType="button" type="primary" size="large">
          Сохранить
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
      </div>
    </div>
  );
};
