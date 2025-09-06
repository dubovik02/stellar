import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import type { TModalProps } from '@/utils/types';
import type { SyntheticEvent } from 'react';

import styles from './modal.module.css';

export const Modal = (props: TModalProps): React.JSX.Element => {
  const escEvent = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      props.onCloseEvent!.call([]);
    }
  };

  const modalOnClick = (event: SyntheticEvent): void => {
    event.stopPropagation();
  };

  useEffect(() => {
    window.addEventListener('keydown', escEvent);
    return (): void => {
      window.removeEventListener('keydown', escEvent);
    };
  }, []);

  const rootElem = document.getElementById('modals');

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onCloseEvent={props.onCloseEvent}>
        <div className={`${styles.modal__container} p-10`} onClick={modalOnClick}>
          <div className={styles.modal__header}>
            <h3 className="text text_type_main-large">{props.caption}</h3>
            <CloseIcon
              className={styles.modal__close_ico as string}
              type="primary"
              onClick={props.onCloseEvent}
            />
          </div>
          <div className={styles.modal__content_container as string}>
            {props.children}
          </div>
        </div>
      </ModalOverlay>
    </>,
    rootElem!
  );
};
