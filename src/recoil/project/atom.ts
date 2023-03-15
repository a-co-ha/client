import { atom, atomFamily } from 'recoil';

export const pageListState = atom({
  key: 'pageList',
  default: [
    {
      pageId: '',
      pageTitle: '',
      type: '',
    },
  ],
});

export const pageTitleState = atomFamily({
  key: 'pageTitleState',
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

export const pageTitleEditToggle = atomFamily({
  key: 'pageTitleEditToggle',
  default: false,
});

export const pageTitleShare = atomFamily({
  key: 'pageTitleShare',
  default: '',
});
