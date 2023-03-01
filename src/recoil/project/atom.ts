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

export const channelListState = atom({
  key: 'channelList',
  default: [
    {
      id: '',
      channelName: '',
    },
  ],
});
