import { atom } from 'recoil';

export const blocksState = atom({
  key: 'editableBlock',
  default: [
    {
      tag: 'p',
      html: '',
      imageUrl: '',
    },
  ],
});
