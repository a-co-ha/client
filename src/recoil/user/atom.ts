import { atom, atomFamily } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import type { User } from '@/pages/api/user/type';

// export const userProfile = atom({
//   key: `userProfile/${nanoId()}`,
//   default: {
//     id: '',
//     avartarUrl: '',
//   },
// });

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
