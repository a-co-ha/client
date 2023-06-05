import { atom, atomFamily } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import type { User } from '@/pages/api/user/type';
import type { UserInChannel } from '@/components/editable-block/type';

export const userDataState = atom<User>({
  key: `userData/${nanoId()}`,
  default: {
    userId: 0,
    githubID: '',
    githubURL: '',
    img: '',
    name: '',
    channels: [
      {
        id: 0,
        userId: 0,
        channelName: '',
        channelImg: '',
        repoName: '',
        repoType: '',
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

export const loginModalState = atom({
  key: `loginModalState/${nanoId()}`,
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
    channelId: '',
  },
});

export const inviteModalState = atom({
  key: `inviteModalState/${nanoId()}`,
  default: false,
});

export const channelUserState = atom<UserInChannel[]>({
  key: `channelUserState/${nanoId()}`,
  default: [],
});

export const channelUserModalState = atomFamily({
  key: `channelUserModalState/${nanoId()}`,
  default: false,
});
