import { atom, atomFamily } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import type { Channels } from '@/components/project-sidebar/type';

export const pageListState = atom({
  key: `pageList/${nanoId()}`,
  default: [
    {
      page: {
        _id: '',
        pageName: '',
        type: '',
        categories: '',
      },
    },
  ],
});

export const channelListState = atom<Channels[]>({
  key: `channelListState/${nanoId()}`,
  default: [
    // {
    //   id: 0,
    //   channelName: '',
    // },
  ],
});

export const channelNameState = atom({
  key: 'channelNameState',
  default: 'A - COHA',
});

export const pageNameEditToggle = atomFamily({
  key: `pageNameEditToggle/${nanoId()}`,
  default: false,
});

export const pageNameShare = atomFamily({
  key: `pageNameShare/${nanoId()}`,
  default: '',
});
