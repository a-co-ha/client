import { atom, atomFamily } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import { ChannelList } from '@/pages/api/user/type';

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

export const channelListState = atom<ChannelList[]>({
  key: `channelListState/${nanoId()}`,
  default: [],
});

export const channelNameState = atom({
  key: `channelNameState/${nanoId()}`,
  default: 'A - COHA',
});

export const deleteModalState = atom({
  key: `deleteModalState/${nanoId()}`,
  default: false,
});

export const pageNameEditToggle = atomFamily({
  key: `pageNameEditToggle/${nanoId()}`,
  default: false,
});

export const pageNameShare = atomFamily({
  key: `pageNameShare/${nanoId()}`,
  default: '',
});
