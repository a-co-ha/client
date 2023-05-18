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
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { socketMessageState } from '@/recoil/socket/atom';
import { getTimeValue } from '@/utils/getTimeValue';
import type { pageProps } from '@/pages/api/editable/type';
import type { SocketMessage } from '@/pages/api/socket/type';
import * as styles from './styles';

export const ChatPage = ({ channelId, pageId, type }: pageProps) => {
  const { sendMessage, receiveMessage, socket } = useContext(SocketContext);
  // const { data: socketMessage } = useGetSocketPage(pageId);
  const [messages, setMessages] = useRecoilState(socketMessageState(pageId));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const addMessage = (message: any) => {
    console.log(`addmessage`, message);
    setMessages((prev) => {
      console.log(`prev`, prev);
      const newMessage = prev.concat([message]);
      console.log(`newMesage`, newMessage);
      return newMessage;
    });
    console.log(`메세지스`, messages);
  };

  // useEffect(() => {
  //   if (socketMessage !== undefined) {
  //     console.log(`socketMsg`, socketMessage.messages);
  //     setMessages(socketMessage.messages);
  //     console.log(`메세지스`, messages);
  //   }
  // }, [router.query.pageId, socketMessage]);
  // useEffect(() => {
  //   socket.emit(`READ_MESSAGE`, {
  //     roomId: pageId,
  //   });
  //   console.log('보냄');
  // }, [router.query.pageId]);
  useLayoutEffect(() => {
    sendMessage(pageId);
  }, [router.query.pageId]);

  useEffect(() => {
    socket.on(`GET_MESSAGE`, (data: SocketMessage[]) => {
      console.log(`리드`, data);
      setMessages(data);
    });
  }, [router.query.pageId]);

  useEffect(() => {
    receiveMessage(addMessage);
  }, [receiveMessage]);
  // useEffect(() => {
  //   socket.on(`RECEIVE_MESSAGE`, (data) => {
  //     console.log(`받습니다`);
  //     addMessage(data.message);
  //     console.log(`여기다`, messages);
  //   });
  // }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: 'center' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
                  content={msg.content}
                  img={msg.img}
                  isDisplay={isDisplay}
                  currentMsgTime={currentMsgTime}
                />
              );
            })}
          <div ref={messagesEndRef} />
        </div>
        <ChatSendForm
          pageId={pageId}
          messagesEndRef={messagesEndRef}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
};
