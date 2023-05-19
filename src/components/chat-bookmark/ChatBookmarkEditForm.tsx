import { useForm } from 'react-hook-form';
import { useChatBookmarkForm } from '@/hooks/form/useChatBookmarkForm';
import { RefObject, useContext, useEffect, useRef } from 'react';
import { SocketContext } from '../chat-page/SocketContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import * as styles from './styles';
import type { ChatBookmarkFormType, ChatBookmarkPatchType } from './type';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  chatBookmarkFormDataState,
  isBookmarkEditingState,
  chatBookmarkEditContentShare,
} from '@/recoil/socket/atom';
import { usePatchBookmark } from '@/hooks/queries/socket/patchBookmark';

export const CahtBookmarkEditForm = ({
  channelId,
  pageId,
  id,
  bookmarkDeleteHandler,
}: {
  channelId: string;
  pageId: string;
  id: string;
  bookmarkDeleteHandler: () => void;
}) => {
  const patchBookmark = usePatchBookmark(channelId, pageId);
  const chatBookmarkData = useRecoilValue(chatBookmarkFormDataState);
  const [isBookmarkEditing, setIsBookmarkEditing] = useRecoilState(
    isBookmarkEditingState
  );
  const [ChatBookmarkEditContentShare, setChatBookmarkEditContentShare] =
    useRecoilState(chatBookmarkEditContentShare(id));

  const methods = useForm<ChatBookmarkFormType>({
    defaultValues: {
      chatBookmarkTitle: ChatBookmarkEditContentShare.chatBookmarkTitle,
      chatBookmarkContent: ChatBookmarkEditContentShare.chatBookmarkContent,
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
    setChatBookmarkEditContentShare({
      id: '',
      chatBookmarkTitle: chatBookmark.chatBookmarkTitle,
      chatBookmarkContent: chatBookmark.chatBookmarkContent,
    });
    patchBookmark.mutate({
      id: chatBookmarkData.id,
      chatBookmarkTitle: chatBookmark.chatBookmarkTitle,
      chatBookmarkContent: chatBookmark.chatBookmarkContent,
    });

    setIsBookmarkEditing(false);
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
  };

  const bookmarkEditHandler = () => {
    setIsBookmarkEditing(false);
    methods.reset();
  };

  return (
    <div>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div css={styles.chatBookmarkFormEditBox}>
          <div css={styles.chatBookmarkModalTitleBox}>
            <input
              css={styles.chatBookmarkFormTitleInput(
                !!titleError,
                isBookmarkEditing
              )}
              type="text"
              value={chatBookmarkTitle.value}
              onChange={chatBookmarkTitle.onChange}
              onKeyDown={onKeyDownTitleHandler}
              spellCheck={false}
              autoFocus
              placeholder={`제목`}
            />
            <button
              css={styles.chatBookmarkModalEditBtn(isBookmarkEditing)}
              onClick={bookmarkEditHandler}
            >
              Cancel
            </button>
            <button
              css={styles.chatBookmarkModalDeleteBtn}
              onClick={bookmarkDeleteHandler}
            >
              Delete
            </button>
          </div>
          <div css={styles.chatBookmarkFormEditBox}>
            <textarea
              css={styles.chatBookmarkFormInput(isBookmarkEditing)}
              value={chatBookmarkContent.value}
              onChange={chatBookmarkContent.onChange}
              onKeyDown={onKeyDownContentHandler}
              name={chatBookmarkContent.name}
              spellCheck={false}
              placeholder={`내용을 입력해주세요`}
            />
          </div>
          <button
            disabled={isSubmitting}
            css={styles.chatBookmarkFormBtn}
            type="submit"
          >
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#f85d75' }} />
          </button>
        </div>
      </form>
    </div>
  );
};
