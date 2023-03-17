import { atom, atomFamily } from 'recoil';

export const pageListState = atom({
  key: 'pageList',
  default: [
    {
      _id: '',
      pageName: '',
      type: '',
    },
  ],
});

export const channelListState = atom({
  key: 'channelListState',
  default: [
    {
      id: 0,
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
