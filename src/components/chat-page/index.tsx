import { useEffect, useState, useContext, useRef } from 'react';
import { SocketContext } from './SocketContextProvider';
import { useGetSocketPage } from '@/hooks/queries/socket/getPage';
import { ChatSendForm } from './ChatSendForm';
import { Message } from './Message';
import dayjs from 'dayjs';
import type { pageProps } from '@/pages/api/editable/type';
import * as styles from './styles';

export const ChatPage = ({ channelId, pageId, type }: pageProps) => {
  // const { sendMessage } = useContext(SocketContext);
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
      userId: 96574345,
      name: 'tangjin',
      text: 'hahah',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 232323,
      name: 'tangjin',
      text: 'fds',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 96574345,
      name: 'tangjin',
      text: 'hahadaah',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 12345,
      name: 'tangjin',
      text: 'hahah',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 1234,
      name: 'tangjin',
      text: 'fds',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 96574345,
      name: 'tangjin',
      text: 'hahadaah',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 96574345,
      name: 'tangjin',
      text: 'hahah',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 1234,
      name: 'tangjin',
      text: 'fds',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 4343,
      name: 'tangjin',
      text: 'hahadaah',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 1234,
      name: 'tangjin',
      text: 'hahah',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 96574345,
      name: 'tangjin',
      text: 'fds',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 4343,
      name: 'tangjin',
      text: 'hahadaah',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 1234,
      name: 'tangjin',
      text: 'hahah',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 232323,
      name: 'tangjin',
      text: 'fds',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 1234,
      name: 'tangjin',
      text: 'hahadaah',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 4343,
      name: 'tangjin',
      text: 'hahadaah',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 96574345,
      name: 'tangjin',
      text: 'hahadaah',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 96574345,
      name: 'tangjin',
      text: 'hahadaah',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
    {
      userId: 1234,
      name: 'tangjin',
      text: 'hahadaah',
      createdAt: '2023-03-19T16:09:09.401Z',
    },
  ];
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  interface Msg {
    userId: number;
    name: string;
    text: string;
    createdAt: string;
  }

  const getTimeValue = (createdAt: string) => {
    const date = dayjs(createdAt);
    const kDate = dayjs(date.subtract(9, 'hour'));
    const hour = kDate.get(`hour`);
    const minute = kDate.get(`minute`);
    const displayHour = hour < 12 ? `0${hour}` : hour - 12;
    const displayminute = minute < 10 ? `0${minute}` : minute;
    const isAm = hour < 12 ? `오전` : `오후`;
    const time = `${isAm} ${displayHour}:${displayminute}`;
    console.log(kDate);
    return time;
  };

  const displayTime = (msg: Msg[], index: number) => {
    let isDisplay = true;
    const currentMsgTime = getTimeValue(msg[index].createdAt);
    if (index !== msg.length - 1) {
      const nextSender = msg[index + 1].name;
      if (nextSender === msg[index].name) {
        const nextSenderTime = getTimeValue(msg[index + 1].createdAt);
        if (nextSenderTime === currentMsgTime) {
          isDisplay = false;
        }
      }
    }
    return isDisplay;
  };

  return (
    <div css={styles.chatPage}>
      {/* <div>chatpage</div> */}
      <div css={styles.chatPageInnerBox}>
        <div css={styles.messageBox}>
          {messages.map((msg, i) => {
            const isDisplayTime = displayTime(messages, i);
            const currentMsgTime = getTimeValue(msg.createdAt);
            return (
              <Message
                key={i}
                userId={msg.userId}
                name={msg.name}
                text={msg.text}
                isDisplayTime={isDisplayTime}
                currentMsgTime={currentMsgTime}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <ChatSendForm pageId={pageId} messagesEndRef={messagesEndRef} />
      </div>
    </div>
  );
};

/**
 * 이전 메세지와 현재 메세지 비교,
 * getDate() - getDate() >
 */
