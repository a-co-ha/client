import { atom } from 'recoil';
import { nanoId } from '@/utils/nanoId';

/**
 * getServerSideProps에서 쓰려고 했으나 보류
 * https://github.com/a-co-ha/client/issues/2
 */
export const blocksState = atom({
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
