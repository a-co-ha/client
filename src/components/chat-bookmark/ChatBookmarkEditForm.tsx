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
  chatBookmarkFormModalState,
  chatBookmarkFormDataState,
  isBookmarkEditingState,
} from '@/recoil/socket/atom';
import { usePatchBookmark } from '@/hooks/queries/socket/patchBookmark';

export const CahtBookmarkEditForm = ({
  channelId,
  pageId,
}: {
  channelId: string;
  pageId: string;
}) => {
  const { socket } = useContext(SocketContext);
  const patchBookmark = usePatchBookmark(channelId, pageId);
  const chatBookmarkData = useRecoilValue(chatBookmarkFormDataState);
  const setIsBookmarkEditing = useSetRecoilState(isBookmarkEditingState);
  const [chatBookmarkFormModal, setChatBookmarkFormModal] = useRecoilState(
    chatBookmarkFormModalState
  );
  const methods = useForm<ChatBookmarkFormType>({
    defaultValues: {
      chatBookmarkTitle: chatBookmarkData.bookmarkName,
      chatBookmarkContent: chatBookmarkData.content,
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
    patchBookmark.mutate({
      id: chatBookmarkData.id,
      chatBookmarkTitle: chatBookmark.chatBookmarkTitle,
      chatBookmarkContent: chatBookmark.chatBookmarkContent,
    });
    // setChatBookmarkFormModal(false)
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

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setChatBookmarkFormModal(false);
    methods.reset();
  };

  return (
    <div>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div css={styles.chatBookmarkFormInputBox}>
          <input
            css={styles.chatBookmarkFormTitleInput(!!titleError)}
            type="text"
            value={chatBookmarkTitle.value}
            onChange={chatBookmarkTitle.onChange}
            onKeyDown={onKeyDownTitleHandler}
            spellCheck={false}
            autoFocus
            placeholder={`제목`}
          />
          <textarea
            css={styles.chatBookmarkFormInput}
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
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#f85d75' }} />
          </button>
        </div>
      </form>
    </div>
  );
};
