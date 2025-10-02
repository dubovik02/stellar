import errorIco from '../../pictures/close.png';
import alertIco from '../../pictures/danger.png';
import infoIco from '../../pictures/information.png';

import styles from './message-dialog.module.css';

type TMessageDialogProps = {
  messageType: 'info' | 'error' | 'alert';
  message: string;
};

export const MessageDialog = ({
  messageType,
  message,
}: TMessageDialogProps): React.JSX.Element => {
  let icoPic;
  switch (messageType) {
    case 'info':
      icoPic = infoIco;
      break;

    case 'error':
      icoPic = errorIco;
      break;

    case 'alert':
      icoPic = alertIco;
      break;

    default:
      icoPic = alertIco;
  }

  return (
    <div className={styles.container}>
      <img className={styles.icon} src={icoPic} alt={'внимание'}></img>
      <p className="text text_type_main-small">{message}</p>
    </div>
  );
};
