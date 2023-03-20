import { atom } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import type { User } from '@/pages/api/user/types';

export const userProfile = atom({
  key: `userProfile/${nanoId()}`,
  default: {
    id: '',
    avartarUrl: '',
  },
});

export const userDataState = atom<User>({
  key: `userData/${nanoId()}`,
  default: {
    id: 0,
    github_id: '',
    github_url: '',
    img: '',
    name: '',
    channels: [
      {
        id: 0,
        admin: '',
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
