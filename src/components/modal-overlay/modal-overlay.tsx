import { Modal } from '../modal/modal';

import type { TModalProps } from '@/utils/types';

import styles from './modal-overlay.module.css';

export const ModalOverlay = (props: TModalProps): React.JSX.Element => {
  return (
    <div className={styles.modalOverlay__container} onClick={props.onCloseEvent}>
      <Modal {...props} />
    </div>
  );
};
