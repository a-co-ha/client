import { atom } from 'recoil';

export const userProfile = atom({
  key: 'userProfile',
  default: {
    id: '',
    avartarUrl: '',
  },
});

export const userDataState = atom({
  key: 'userData',
  default: [
    {
      github_id: '',
      github_url: '',
      img: '',
      name: '',
      channel_id: '',
      channel_name: '',
      channel_admin: '',
      channel_img: '',
    },
  ],
});

export const initialUserState = atom({
  key: 'initialUserState',
  default: true,
});

export const loginState = atom({
  key: 'loginState',
  default: false,
});
