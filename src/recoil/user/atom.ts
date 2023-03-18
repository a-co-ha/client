import { atom } from 'recoil';
import { nanoId } from '@/utils/nanoId';

export const userProfile = atom({
  key: `userProfile/${nanoId()}`,
  default: {
    id: '',
    avartarUrl: '',
  },
});

export const userDataState = atom({
  key: `userData/${nanoId()}`,
  default: {
    github_id: '',
    github_url: '',
    img: '',
    name: '',
    // userHasChannels: [
    //   {
    //     channel_id: '',
    //     channel: {
    //       id: 0,
    //       admin: '',
    //       channelName: '',
    //       channelImg: '',
    //     },
    //   },
    // ],
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
