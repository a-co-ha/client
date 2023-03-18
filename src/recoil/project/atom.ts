import { atom, atomFamily } from 'recoil';
import { nanoId } from '@/utils/nanoId';

export const pageListState = atom({
  key: `pageList/${nanoId()}`,
  default: [
    {
      _id: '',
      pageName: '',
      type: '',
    },
  ],
});

export const channelListState = atom({
  key: `channelListState/${nanoId()}`,
  default: [
    {
      id: 0,
      channelName: '',
    },
  ],
});

export const pageNameEditToggle = atomFamily({
  key: `pageNameEditToggle/${nanoId()}`,
  default: false,
});

export const pageNameShare = atomFamily({
  key: `pageNameShare/${nanoId()}`,
  default: '',
});
