import { useEffect, useState, useContext, useRef } from 'react';
import { SocketContext } from './SocketContextProvider';
import { useGetSocketPage } from '@/hooks/queries/socket/getPage';
import * as styles from './styles';
import type { pageProps } from '@/pages/api/editable/type';
import { ChatSendForm } from './ChatSendForm';

export const ChatPage = ({ channelId, pageId, type }: pageProps) => {
  const { sendMessage } = useContext(SocketContext);
  const { data: socketData } = useGetSocketPage(channelId, pageId, type);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //       try {
  //           joinRoom({userId, roomId});
  //           updateMessage(addMessage);
  //       } catch {
  //           navigate('/');
  //       }
  //   }, []);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div css={styles.chatPage}>
      <div css={styles.chatPageInnerBox}>
        <div>chatpage</div>
        <div>
          <div>
            <button>Send Message</button>
            <button>여기서 연결</button>
            <div ref={messagesEndRef} />
          </div>
        </div>
        <ChatSendForm pageId={pageId} />
      </div>
    </div>
  );
};
