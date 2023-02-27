import { atom } from 'recoil';

export const pageListState = atom({
  key: 'pageList',
  default: [
    {
      pageId: '',
      pageName: '',
      type: '',
    },
  ],
});
