import { atom } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import type { CommitLogOrgResponse } from '@/components/project-main/type';
import type { CommitLogRepoResponse } from '@/components/project-main/type';

export const commitLogModalFormState = atom({
  key: `commitLogModalFormState/${nanoId()}`,
  default: false,
});

export const commitLogModalOrgSearchState = atom<CommitLogOrgResponse[]>({
  key: `commitLogModalOrgSearchState/${nanoId()}`,
  default: [
    // {
    //   name: '',
    //   orgID: 0,
    //   orgImg: '',
    //   desc: '',
    // },
  ],
});

export const commitLogModalRepoSearchState = atom<CommitLogRepoResponse[]>({
  key: `commitLogModalRepoSearchState/${nanoId()}`,
  default: [
    // desc: '',
    // events: [],
    // name: '',
    // private: false,
    // url: '',
  ],
});
