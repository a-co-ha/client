import {
  useEffect,
  useState,
  useContext,
  useRef,
  useLayoutEffect,
  useCallback,
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
  const { socket } = useContext(SocketContext);
  const { data: socketMessage } = useGetSocketPage(pageId);
  const [messages, setMessages] = useRecoilState(socketMessageState(pageId));
  const [isDuplication, setIsDuplication] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const addMessage = useCallback((message: any) => {
    console.log(`addmessage`, message);
    setMessages((prev) => {
      const newMessage = prev.concat([message]);
      return newMessage;
    });
  }, []);

  useLayoutEffect(() => {
    if (socketMessage !== undefined) {
      console.log(`socketMsg`, socketMessage.messages);
      setMessages(socketMessage.messages);
      console.log(`메세지스`, messages);
    }
  }, [router.query.pageId]);

  useEffect(() => {
    socket.on(`message-receive`, (data) => {
      if (isDuplication === data.id) {
        console.log(`리턴`);
        return;
      } else {
        setIsDuplication(data.id);
        console.log(`받습니다`);
        addMessage(data.message);
        console.log(`여기다`, messages);
      }
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: 'center' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getTimeValue = (createdAt: string) => {
    const date = dayjs(createdAt);
    const nowDate = dayjs();
    const hour = date.get(`hour`);
    const minute = date.get(`minute`);
    const displayHour = hour < 12 ? hour : hour - 12;
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
    const currentMsgTime = getTimeValue(msg[index].createdAt);
    if (index !== 0) {
      const prevSender = msg[index - 1].name;
      if (prevSender === msg[index].name) {
        const nextSenderTime = getTimeValue(msg[index - 1].createdAt);
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
          {messages &&
            messages?.map((msg, i) => {
              const isDisplay = displayTime(messages, i);
              const currentMsgTime = getTimeValue(msg.createdAt);
              return (
                <Message
                  key={i}
                  userId={msg.userId}
                  name={msg.name}
                  text={msg.text}
                  img={msg.img}
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
