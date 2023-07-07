import { nanoId } from '@/utils/nanoId';
import { atom } from 'recoil';

export const currentBlockIdState = atom({
  key: `currentBlockId/${nanoId()}`,
  default: '',
});

export const currentUrlState = atom({
  key: `currentUrl/${nanoId()}`,
  default: '',
});
