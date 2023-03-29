import { atom, atomFamily } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import type { Block } from '@/components/editable-page/type';

/**
 * getServerSideProps에서 쓰려고 했으나 보류
 * https://github.com/a-co-ha/client/issues/2
 */
export const blocksState = atomFamily<Block[], string>({
  key: `editableBlock/${nanoId()}`,
  default: [
    {
      blockId: '',
      tag: 'p',
      html: '',
      imgUrl: '',
    },
  ],
});

export const currentBlockIdState = atom({
  key: `currentBlockId/${nanoId()}`,
  default: '',
});

export const currentUrlState = atom({
  key: `currentUrl/${nanoId()}`,
  default: '',
});
