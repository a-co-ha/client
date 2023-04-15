import { atom } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import type { SocketMessage } from '@/pages/api/socket/type';

// export const socketState = atom<Socket<DefaultEventsMap, DefaultEventsMap>>({
//   key: `socket/${nanoId()}`,
//   // default: Socket<DefaultEventsMap, DefaultEventsMap>,
// });

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

export const socketMessageState = atom<SocketMessage[]>({
  key: `socketMessageState/${nanoId()}`,
  default: [
    {
      name: '',
      text: '',
      img: '',
      userId: 0,
      createdAt: '',
    },
  ],
});
