import { atom, atomFamily } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import type { User } from '@/pages/api/user/type';

export const userDataState = atom<User>({
  key: `userData/${nanoId()}`,
  default: {
    id: 0,
    userId: 0,
    github_id: '',
    github_url: '',
    img: '',
    name: '',
    channels: [
      {
        id: 0,
        userId: 0,
        channelName: '',
        channelImg: '',
      },
    ],
  },
});

export const initialUserState = atom({
  key: `initialUserState/${nanoId()}`,
  default: true,
});

export const loginState = atom({
  key: `loginState/${nanoId()}`,
  default: false,
});

export const adminState = atomFamily({
  key: `adminState/${nanoId()}`,
  default: false,
});

export const inviteChannelState = atom({
  key: `inviteChannelState/${nanoId()}`,
  default: {
    userId: 0,
    channelName: '',
  },
});

export const inviteModalState = atom({
  key: `inviteModalState/${nanoId()}`,
  default: false,
});

export const channelUserState = atom({
  key: `channelUserState/${nanoId()}`,
  default: [],
});

export const channelUserModalState = atom({
  key: `channelUserModalState/${nanoId()}`,
  default: false,
});
