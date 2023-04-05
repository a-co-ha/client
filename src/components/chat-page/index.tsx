import { useEffect, useState, useContext } from 'react';
import { SocketContext } from './SocketContextProvider';
import { useGetSocketPage } from '@/hooks/queries/socket/getPage';
import * as styles from './styles';
import type { pageProps } from '@/pages/api/editable/type';
import io from 'socket.io-client';

export const ChatPage = ({ channelId, pageId, type }: pageProps) => {
  const { messageSend } = useContext(SocketContext);

  const { data: socketData } = useGetSocketPage(channelId, pageId, type);
  return (
    <div css={styles.chatPage}>
      <div>chatpage</div>
      <button>Send Message</button>
      <button>여기서 연결</button>
    </div>
  );
};
