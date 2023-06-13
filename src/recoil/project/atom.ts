import { atom, atomFamily } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import type { ChannelList } from '@/pages/api/user/type';
import type { GetChannelPages } from '@/pages/api/editable/type';

export const pageListState = atom<GetChannelPages>({
  key: `pageList/${nanoId()}`,
  default: {
    _id: '',
    channelId: 0,
    channelName: '',
    EditablePage: [
      {
        page: {
          _id: '',
          pageName: '',
          type: '',
          categories: '',
        },
        template: {
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
        page: {
          _id: '',
          pageName: '',
          type: '',
          categories: '',
        },
        template: {
          _id: '',
          pageName: '',
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
  default: '',
});

export const channelImageState = atom({
  key: `channelImageState/${nanoId()}`,
  default: '',
});

export const channelSidebarOpenState = atom({
  key: `channelSidebarOpenState/${nanoId()}`,
  default: true,
});

export const channelMobileRightSidebarOpenState = atom({
  key: `channelMobileRightSidebarOpenState/${nanoId()}`,
  default: false,
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

export const confirmModalState = atomFamily({
  key: `confirmModalState/${nanoId()}`,
  default: false,
});

export const LandingPageNavbarIsScroll = atom({
  key: `LandingPageNavbarIsScroll/${nanoId()}`,
  default: false,
});

export const changeProjectImgModalState = atom({
  key: `changeProjectImgModalState/${nanoId()}`,
  default: false,
});

export const changeProjectNameEditToggle = atomFamily({
  key: `changeProjectNameEditToggle/${nanoId()}`,
  default: false,
});
