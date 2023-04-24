import { useForm } from 'react-hook-form';
import { useChatBookmarkForm } from '@/hooks/form/useChatBookmarkForm';
import { RefObject, useContext, useEffect, useRef } from 'react';
import { SocketContext } from '../chat-page/SocketContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import * as styles from './styles';
import type { ChatBookmarkFormType } from './type';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  chatBookmarkFormModalState,
  isBookmarkEditingState,
} from '@/recoil/socket/atom';
import { usePostBookmark } from '@/hooks/queries/socket/postBookmark';

export const ChatBookmarkForm = ({
  channelId,
  pageId,
}: {
  channelId: string;
  pageId: string;
}) => {
  const { socket } = useContext(SocketContext);
  const postBookmark = usePostBookmark(channelId, pageId);
  const [isBookmarkEditing, setIsBookmarkEditing] = useRecoilState(
    isBookmarkEditingState
  );
  const [chatBookmarkFormModal, setChatBookmarkFormModal] = useRecoilState(
    chatBookmarkFormModalState
  );
  const methods = useForm<ChatBookmarkFormType>({
    defaultValues: {
      chatBookmarkTitle: '',
      chatBookmarkContent: '',
    },
    mode: 'onSubmit',
  });
  const {
    chatBookmarkTitle,
    chatBookmarkContent,
    titleError,
    contentError,
    isSubmitting,
  } = useChatBookmarkForm({
    control: methods.control,
  });

  const onSubmit = (chatBookmark: ChatBookmarkFormType) => {
    console.log(`submitData`, chatBookmark);
    // postBookmark.mutate(chatBookmark);
    socket.emit(`SET_BOOKMARK`, {
      bookmarkName: chatBookmark.chatBookmarkTitle,
      content: chatBookmark.chatBookmarkContent,
      roomId: pageId,
    });
    setChatBookmarkFormModal(false);
    methods.reset();
  };

  const onKeyDownTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      methods.setFocus(`chatBookmarkContent`);
    }
  };

  const onKeyDownContentHandler = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.nativeEvent.isComposing) return;
    // e.preventDefault();
    // if (e.key === 'Enter' && e.shiftKey) {
    //   return;
    // }
  };

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setChatBookmarkFormModal(false);
    methods.reset();
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
              <div css={styles.chatBookmarkFormEditBox}>
                <input
                  css={styles.chatBookmarkFormTitleInput(
                    !!titleError,
                    isBookmarkEditing
                  )}
                  type="text"
                  value={chatBookmarkTitle.value}
                  onChange={chatBookmarkTitle.onChange}
                  onKeyDown={onKeyDownTitleHandler}
                  maxLength={30}
                  spellCheck={false}
                  autoFocus
                  placeholder={`제목`}
                />
                <textarea
                  css={styles.chatBookmarkFormInput(isBookmarkEditing)}
                  value={chatBookmarkContent.value}
                  onChange={chatBookmarkContent.onChange}
                  onKeyDown={onKeyDownContentHandler}
                  name={chatBookmarkContent.name}
                  spellCheck={false}
                  placeholder={`내용을 입력해주세요`}
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
