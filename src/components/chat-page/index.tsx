import type { pageProps } from '@/pages/api/editable/type';
import type { SocketMessage } from '@/pages/api/socket/type';
import { socketMessageState } from '@/recoil/socket/atom';
import { getTimeValue } from '@/utils/getTimeValue';
import { useRouter } from 'next/router';
import { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { channelSidebarOpenState } from '@/recoil/project/atom';
import { ChatSendForm } from './ChatSendForm';
import { Message } from './Message';
import { MessageModal } from './MessageModal';
import { SocketContext } from './SocketContextProvider';
import * as styles from './styles';

export const ChatPage = ({ pageId }: pageProps) => {
  const setIsChannelSidebarOpen = useSetRecoilState(channelSidebarOpenState);
  const onClickHandler = () => {
    if (window !== undefined) {
      window.innerWidth <= 450 ? setIsChannelSidebarOpen(false) : null;
    }
  };

  const { readMessage, receiveMessage, getMessage } = useContext(SocketContext);
  const [messages, setMessages] = useRecoilState(socketMessageState(pageId));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const addMessage = (message: any) => {
    setMessages((prev) => {
      const newMessage = prev.concat([message]);
      return newMessage;
    });
  };
  useLayoutEffect(() => {
    readMessage(pageId);
  }, [router.query.pageId]);

  useEffect(() => {
    receiveMessage(addMessage);
  }, [receiveMessage]);

  useEffect(() => {
    getMessage(setMessages);
  }, [getMessage]);

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
    <div css={styles.chatPage} onClick={onClickHandler}>
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
