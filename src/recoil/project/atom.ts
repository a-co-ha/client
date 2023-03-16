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

export const channelListState = atom({
  key: 'channelListState',
  default: [
    {
      id: '',
      channelName: '',
    },
  ],
});

export const pageNameEditToggle = atomFamily({
  key: 'pageNameEditToggle',
  default: false,
});

export const pageNameShare = atomFamily({
  key: 'pageNameShare',
  default: '',
});
