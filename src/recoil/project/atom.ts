import { atom, atomFamily } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import type { ChannelList } from '@/pages/api/user/type';
import type { GetChannelPages } from '@/pages/api/editable/type';

export const pageListState = atom<GetChannelPages>({
  key: `pageList/${nanoId()}`,
  default: {
    _id: '',
    channelId: 0,
    EditablePage: [
      {
        page: {
          _id: '',
          pageName: '',
          type: '',
          categories: '',
        },
        _id: '',
      },
    ],
    SocketPage: [
      {
        room: {
          _id: '',
          roomName: '',
          type: '',
          categories: '',
        },
        _id: '',
      },
    ],
  },
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
