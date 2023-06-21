import type { ChatBookmarkFormType } from '@/components/chat-bookmark/type';
import type {
  ChatBookmark,
  SocketMessage,
  SocketMessageStatus,
} from '@/pages/api/socket/type';
import { nanoId } from '@/utils/nanoId';
import { atom, atomFamily } from 'recoil';

export const onUserState = atom({
  key: `onUserState/${nanoId()}`,
  default: [
    {
      img: '',
      userID: 0,
      name: '',
    },
  ],
});

export const messageModalState = atom({
  key: `messageModalState/${nanoId()}`,
  default: false,
});

export const messageModalImgState = atom({
  key: `messageModalImgState/${nanoId()}`,
  default: '',
});

export const messageStatusState = atom<SocketMessageStatus[]>({
  key: `messageStatusState/${nanoId()}`,
  default: [],
});

export const messageReadState = atomFamily({
  key: `messageReadState/${nanoId()}`,
  default: false,
});

export const socketMessageState = atomFamily<SocketMessage[], string>({
  key: `socketMessageState/${nanoId()}`,
  default: [],
});

export const messageMoreState = atom({
  key: `messageMoreState/${nanoId()}`,
  default: false,
});

export const chatBookmarkState = atom<ChatBookmark[]>({
  key: `chatBookmarkState/${nanoId()}`,
  default: [],
});

export const chatBookmarkModalState = atom({
  key: `chatBookmarkModalState/${nanoId()}`,
  default: false,
});

export const chatBookmarkFormModalState = atom({
  key: `chatBookmarkFormModalState/${nanoId()}`,
  default: false,
});

export const chatBookmarkFormDataState = atom({
  key: `chatBookmarkFormDataState/${nanoId()}`,
  default: {
    id: '',
    bookmarkName: '',
    content: '',
  },
});

export const isBookmarkEditingState = atom({
  key: `isBookmarkEditing/${nanoId()}`,
  default: false,
});

export const chatBookmarkEditContentShare = atomFamily<
  ChatBookmarkFormType,
  string
>({
  key: `chatBookmarkEditContentShare/${nanoId()}`,
  default: {
    id: '',
    chatBookmarkTitle: '',
    chatBookmarkContent: '',
  },
});
