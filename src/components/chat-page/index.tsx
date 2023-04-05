import { useEffect, useState, useContext } from 'react';
// import { SocketContext } from './SocketContextProvider';
import { useGetSocketPage } from '@/hooks/queries/socket/getPage';
import * as styles from './styles';
import type { pageProps } from '@/pages/api/editable/type';
import io from 'socket.io-client';

export const ChatPage = ({ channelId, pageId, type }: pageProps) => {
  const socket = io(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}`, {
    auth: {
      sessionId: `EvwpomSUR5VI4C7SSPR_dIUv0EIDDXQ-`,
      user: {
        userId: 96574345,
        name: 'tangjinlog',
        githubID: 'tangjinlog',
        githubURL: 'https://github.com/tangjinlog',
        img: 'https://avatars.githubusercontent.com/u/96574345?v=4',
      },
    },
  });

  socket.on(`connect`, () => {
    console.log(`연결됨`);
    socket.on(`session`, (data) => console.log(data));
  });
  const { data: socketData } = useGetSocketPage(channelId, pageId, type);
  // const { messageSend } = useContext(SocketContext);
  return (
    <div css={styles.chatPage}>
      <div>chatpage</div>
      <button
        onClick={() =>
          socket.emit(`message-send`, {
            name: 'Yi suho',
            githubID: 'yisuho',
            img: 'img',
            text: '(승하, 수호)에게 12번 채널에서 보냅니다 ',
            channelId: '642bf',
          })
        }
      >
        Send Message
      </button>
      <button>여기서 연결</button>
    </div>
  );
};
