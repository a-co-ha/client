import { useForm } from 'react-hook-form';
import { useChatSendForm } from '@/hooks/form/useChatSendForm';
import { RefObject, useContext, useEffect, useRef } from 'react';
import { SocketContext } from './SocketContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import * as styles from './styles';
import type { ChatMessage } from './type';
import type { SocketMessage } from '@/pages/api/socket/type';

export const ChatSendForm = ({
  pageId,
  messagesEndRef,
  setMessages,
}: {
  pageId: string;
  messagesEndRef: RefObject<HTMLDivElement>;
  setMessages: React.Dispatch<React.SetStateAction<SocketMessage[]>>;
}) => {
  const contentTextarea = useRef(null);
  useEffect(() => {
    contentTextarea.current &&
      (contentTextarea.current as HTMLTextAreaElement).focus();
  }, [pageId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: 'center' });
  };
  const { sendMessage } = useContext(SocketContext);

  const methods = useForm<ChatMessage>({
    defaultValues: {
      chatMessage: '',
    },
    mode: 'onSubmit',
  });
  const { chatMessage, error, isSubmitting } = useChatSendForm({
    control: methods.control,
  });

  const onChangeHandler = ({
    value,
    onChange,
    chatMessage,
  }: {
    value: string;
    onChange: (value: string) => void;
    chatMessage: any;
  }) => {
    chatMessage.style.height = `auto`;
    chatMessage.style.maxHeight = `${window.innerHeight / 2}px`;
    chatMessage.style.height = `${chatMessage.scrollHeight}px`;
    if (value == '```js') {
      chatMessage.style.color = `green`;
    } else {
      chatMessage.style.color = `black`;
    }
    onChange(value);
    scrollToBottom();
  };

  const myMessage = (data: any) => {
    setMessages((prev) => {
      const newMessage = prev.concat([data]);
      return newMessage;
    });
  };

  const onSubmit = (chat: ChatMessage) => {
    sendMessage(chat.chatMessage, pageId);
    console.log(`보냅니다`);
    methods.reset();
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      methods.handleSubmit(onSubmit)();
      e.currentTarget.style.height = `auto`;
      e.preventDefault();
    } else if (e.key === 'Enter' && e.shiftKey) {
      return;
    }
  };

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.previousElementSibling !== null) {
      const textArea = e.currentTarget
        .previousElementSibling as HTMLTextAreaElement;
      textArea.style.height = `auto`;
    }
  };

  const textAreaClickHandler = () => {
    scrollToBottom();
  };

  return (
    <div css={styles.chatFormBox}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div css={styles.chatFormInputBox}>
          <textarea
            ref={contentTextarea}
            spellCheck={false}
            css={styles.chatFormInput}
            rows={1}
            value={chatMessage.value}
            onChange={(e) =>
              onChangeHandler({
                value: e.target.value,
                onChange: chatMessage.onChange,
                chatMessage: e.target,
              })
            }
            onClick={textAreaClickHandler}
            onKeyDown={onKeyDownHandler}
            name={chatMessage.name}
            placeholder={`메세지를 입력해주세요`}
          />
          <button
            disabled={isSubmitting}
            css={styles.chatFormBtn}
            type="submit"
            onClick={onClickHandler}
          >
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#f85d75' }} />
          </button>
        </div>
      </form>
    </div>
  );
};
