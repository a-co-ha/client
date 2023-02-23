import { atom } from 'recoil';

export const userProfile = atom({
  key: 'userProfile',
  default: {
    id: '',
    avartarUrl: '',
  },
});

export const loginState = atom({
  key: 'loginState',
  default: false,
});
