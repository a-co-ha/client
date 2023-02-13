import { atom } from 'recoil';

/**
 * getServerSideProps에서 쓰려고 했으나 보류
 * https://github.com/a-co-ha/client/issues/2
 */
export const blocksState = atom({
  key: 'editableBlock',
  default: [
    {
      _id: '',
      tag: 'p',
      html: '',
      imageUrl: '',
    },
  ],
});

export const currnetBlockIdState = atom({
  key: 'currentBlockId',
  default: '',
});
