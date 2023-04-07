import { useEffect, useState, useContext, useRef } from 'react';
import { SocketContext } from './SocketContextProvider';
import { useGetSocketPage } from '@/hooks/queries/socket/getPage';
import { ChatSendForm } from './ChatSendForm';
import { Message } from './Message';
import type { pageProps } from '@/pages/api/editable/type';
import * as styles from './styles';

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

  const messages = [
    {
      userId: 12345,
      name: 'tangjin',
      text: 'hahah',
    },
    {
      userId: 232323,
      name: 'tangjin',
      text: 'fds',
    },
    {
      userId: 4343,
      name: 'tangjin',
      text: 'hahaaah',
    },
  ];

  return (
    <div css={styles.chatPage}>
      <div css={styles.chatPageInnerBox}>
        <div>chatpage</div>
        <div css={styles.chatPage}>
          <div>
            {/* <button>Send Message</button> */}
            {/* <button>여기서 연결</button> */}
            {messages.map((msg, i) => {
              return (
                <Message
                  key={i}
                  userId={msg.userId}
                  name={msg.name}
                  text={msg.text}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <ChatSendForm pageId={pageId} />
      </div>
    </div>
  );
};
