import { atom, atomFamily } from 'recoil';

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

export const pageNameState = atomFamily({
  key: 'pageNameState',
  default: '',
});

export const channelListState = atom({
  key: 'channelList',
  default: [
    {
      id: '',
      channelName: '',
    },
  ],
});
