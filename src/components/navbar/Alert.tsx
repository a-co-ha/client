import { useEffect, useContext } from 'react';
import { AlertIcon } from './AlertIcon';
import * as styles from './styles';
import { toast } from 'react-toastify';
import { SocketContext } from '../chat-page/SocketContextProvider';

export const Alert = () => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on('ALERT', (data) => {
      console.log('🚀 ~ file: Label.tsx:56 ~ socket.on ~ data:', data);
    });
    socket.on('GET_ALERT', (data) => {
      console.log('🚀 ~ file: Label.tsx:56 ~ socket.on ~ data:', data);
      toast(
        `🦄 ${data.channelName}프로젝트의 ${data.subPageName}${data.pageName}페이지에서 나(${data.targetUserName})를 태그하였습니다.`,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        }
      );
    });
  }, [socket]);
  return (
    <div css={styles.alertBox}>
      <AlertIcon />
    </div>
  );
};
