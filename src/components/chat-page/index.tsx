import {
  useEffect,
  useState,
  useContext,
  useRef,
  useLayoutEffect,
} from 'react';
import { SocketContext } from './SocketContextProvider';
import { useGetSocketPage } from '@/hooks/queries/socket/getPage';
import { ChatSendForm } from './ChatSendForm';
import { Message } from './Message';
import { MessageModal } from './MessageModal';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { socketMessageState } from '@/recoil/socket/atom';
import type { pageProps } from '@/pages/api/editable/type';
import type { SocketMessage } from '@/pages/api/socket/type';
import * as styles from './styles';

export const ChatPage = ({ channelId, pageId, type }: pageProps) => {
  const { receiveMessage } = useContext(SocketContext);
  const { data: socketMessage } = useGetSocketPage(pageId);
  const [messages, setMessages] = useRecoilState(socketMessageState);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const addMessage = (message: any) => {
    console.log(`addmessage`, message);
    setMessages((prev) => prev.concat(message));
  };

  useEffect(() => {
    if (socketMessage !== undefined) {
      console.log(`socketMsg`, socketMessage);
      setMessages(socketMessage);
    }
  }, [router.query.pageId]);

  receiveMessage(addMessage);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // const messages = [
  //   {
  //     userId: 96574345,
  //     name: 'tangjin',
  //     text: 'hahah',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 232323,
  //     name: 'githob',
  //     text: 'fds',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 96574345,
  //     name: 'tangjin',
  //     text: 'hahadaah',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 12345,
  //     name: 'githob',
  //     text: 'hahah',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 1234,
  //     name: 'githob',
  //     text: 'fds',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 96574345,
  //     name: 'tangjin',
  //     text: 'hahadaah',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 96574345,
  //     name: 'tangjin',
  //     text: 'hahah',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 1234,
  //     name: 'githob',
  //     text: 'fds',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 4343,
  //     name: 'githob',
  //     text: 'hahadaah',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 1234,
  //     name: 'githob',
  //     text: 'hahah',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 96574345,
  //     name: 'tangjin',
  //     text: 'fds',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 4343,
  //     name: 'githob',
  //     text: 'hahadaah',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 1234,
  //     name: 'githob',
  //     text: 'hahah',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 232323,
  //     name: 'githob',
  //     text: 'fds',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 1234,
  //     name: 'githob',
  //     text: 'hahadaah',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 4343,
  //     name: 'githob',
  //     text: 'hahadaah',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 96574345,
  //     name: 'tangjin',
  //     text: 'hahadaah',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 96574345,
  //     name: 'tangjin',
  //     text: 'hahadaah',
  //     createdAt: '2023-03-19T16:09:09.401Z',
  //   },
  //   {
  //     userId: 1234,
  //     name: 'githob',
  //     text: '디코스타일 어때요 디코스타일 어떤가요 디코 스타일이 나은가요 카톡 스타일이 나은가요 어떤가요',
  //     createdAt: '2023-04-11T16:09:09.401Z',
  //   },
  //   {
  //     userId: 96574345,
  //     name: 'tangjin',
  //     text: '좋은데요',
  //     createdAt: '2023-04-13T15:09:09.401Z',
  //   },
  // ];
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getTimeValue = (createdAt: string) => {
    const date = dayjs(dayjs(createdAt).subtract(9, 'hour'));
    const nowDate = dayjs();
    const hour = date.get(`hour`);
    const minute = date.get(`minute`);
    const displayHour = hour < 12 ? `0${hour}` : hour - 12;
    const displayminute = minute < 10 ? `0${minute}` : minute;
    const isAm = hour < 12 ? `오전` : `오후`;
    const isToday =
      nowDate.isSame(date, 'day') === true
        ? `오늘`
        : date.isSame(nowDate.subtract(1, 'day'), 'day') === true
        ? `어제`
        : date.isBefore(nowDate.subtract(1, 'day')) === true
        ? date.format(`YYYY.MM.DD`)
        : null;
    const time = `${isToday} ${isAm} ${displayHour}:${displayminute}`;
    return time;
  };

  const displayTime = (msg: SocketMessage[], index: number) => {
    let isDisplay = true;
    const currentMsgTime = getTimeValue(msg[index].createAt);
    if (index !== msg.length - 1 && index !== 0) {
      const prevSender = msg[index - 1].name;
      const nextSender = msg[index + 1].name;
      if (
        (nextSender !== msg[index].name && prevSender === msg[index].name) ||
        (nextSender === msg[index].name && prevSender === msg[index].name)
      ) {
        const nextSenderTime = getTimeValue(msg[index - 1].createAt);
        if (nextSenderTime === currentMsgTime) {
          isDisplay = false;
        }
      }
    }
    return isDisplay;
  };

  return (
    <div css={styles.chatPage}>
      <MessageModal />
      <div css={styles.chatPageInnerBox}>
        <div css={styles.messageBox}>
          {messages?.map((msg, i) => {
            const isDisplay = displayTime(messages, i);
            const currentMsgTime = getTimeValue(msg.createAt);
            return (
              <Message
                key={i}
                userId={msg.from}
                name={msg.name}
                text={msg.text}
                isDisplay={isDisplay}
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
