import { atom, atomFamily } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import type { SocketMessage } from '@/pages/api/socket/type';
import type { chatBookmark } from '@/pages/api/socket/type';

export const onUserState = atom({
  key: `onUserState/${nanoId()}`,
  default: [
    {
      userID: 0,
      name: '',
      img: '',
      messages: [],
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

export const socketMessageState = atomFamily<SocketMessage[], string>({
  key: `socketMessageState/${nanoId()}`,
  default: [],
});

export const chatBookmarkState = atom<chatBookmark[]>({
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
