import { useForm } from 'react-hook-form';
import { useChatBookmarkForm } from '@/hooks/form/useChatBookmarkForm';
import { RefObject, useContext, useEffect, useRef } from 'react';
import { SocketContext } from '../chat-page/SocketContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import * as styles from './styles';
import type { ChatBookmark } from './type';
import { useRecoilState } from 'recoil';
import { chatBookmarkFormModalState } from '@/recoil/socket/atom';

export const ChatBookmarkForm = ({}: {}) => {
  const { socket } = useContext(SocketContext);
  const [chatBookmarkFormModal, setChatBookmarkFormModal] = useRecoilState(
    chatBookmarkFormModalState
  );
  const methods = useForm<ChatBookmark>({
    defaultValues: {
      chatBookmark: '',
    },
    mode: 'onSubmit',
  });
  const { chatBookmark, error, isSubmitting } = useChatBookmarkForm({
    control: methods.control,
  });

  const onSubmit = (chat: ChatBookmark) => {
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

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setChatBookmarkFormModal(false);
  };

  return (
    <div>
      <div
        onClick={onClickHandler}
        css={styles.chatBookmarkModalBackground(chatBookmarkFormModal)}
      ></div>
      <div css={styles.chatBookmarkModalTransition(chatBookmarkFormModal)}>
        <div css={styles.chatBookmarkFormModalBox}>
          <div>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div css={styles.chatBookmarkFormInputBox}>
                <textarea
                  autoFocus
                  spellCheck={false}
                  css={styles.chatBookmarkFormInput}
                  rows={1}
                  value={chatBookmark.value}
                  onChange={chatBookmark.onChange}
                  onKeyDown={onKeyDownHandler}
                  name={chatBookmark.name}
                  placeholder={`메세지를 입력해주세요`}
                />
                <button
                  disabled={isSubmitting}
                  css={styles.chatBookmarkFormBtn}
                  type="submit"
                  // onClick={onClickHandler}
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    style={{ color: '#f85d75' }}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
