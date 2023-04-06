import { useForm } from 'react-hook-form';
import { useChatSendForm } from '@/hooks/form/useChatSendForm';
import { useContext, useRef } from 'react';
import { SocketContext } from './SocketContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import * as styles from './styles';
import type { ChatMessage } from './type';

export const ChatSendForm = ({ pageId }: { pageId: string }) => {
  const { sendMessage } = useContext(SocketContext);

  const onCahngeHandler = ({
    value,
    onChange,
    chatMessage,
  }: {
    value: string;
    onChange: (value: string) => void;
    chatMessage: any;
  }) => {
    if (chatMessage) {
      chatMessage.style.height = `auto`;
      chatMessage.style.height = `${chatMessage.scrollHeight}px`;
    }
    onChange(value);
  };

  const methods = useForm<ChatMessage>({
    defaultValues: {
      chatMessage: '',
    },
    mode: 'onSubmit',
  });
  const { chatMessage, error } = useChatSendForm({
    control: methods.control,
  });

  const onSubmit = async (chatMessage: ChatMessage) => {
    sendMessage(chatMessage.chatMessage, pageId);
  };
  return (
    <div css={styles.chatFormBox}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div css={styles.chatFormInputBox}>
          <textarea
            css={styles.chatFormInput}
            rows={1}
            value={chatMessage.value}
            onChange={(e) =>
              onCahngeHandler({
                value: e.target.value,
                onChange: chatMessage.onChange,
                chatMessage: e.target,
              })
            }
            name={chatMessage.name}
            placeholder={`메세지를 입력해주세요`}
          />
          {/* <p css={styles.validationMsg}>{error ? error.message : 'ㅤ'}</p> */}
          <button type="submit">
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#f85d75' }} />
          </button>
        </div>
      </form>
    </div>
  );
};
