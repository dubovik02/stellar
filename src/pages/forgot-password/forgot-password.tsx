import { RoutePath } from '@/utils/route-config';
import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../forms-styles.module.css';

export const ForgotPassword = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  return (
    <div className={styles.mainContainer}>
      <form className={styles.form}>
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
        <Button htmlType="button" type="primary" size="large">
          Восстановить
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
