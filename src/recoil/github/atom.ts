import { atom } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import type { commitLogOrgResponse } from '@/components/project-main/type';
import type { commitLogRepoResponse } from '@/components/project-main/type';

export const commitLogModalFormState = atom({
  key: `commitLogModalFormState/${nanoId()}`,
  default: false,
});

export const commitLogModalOrgSearchState = atom<commitLogOrgResponse>({
  key: `commitLogModalOrgSearchState/${nanoId()}`,
  default: {
    desc: '',
    orgImg: '',
    orgName: '',
    orgUrl: '',
    repos: [
      {
        name: '',
        url: '',
      },
    ],
  },
});

export const commitLogModalRepoSearchState = atom<commitLogRepoResponse>({
  key: `commitLogModalRepoSearchState/${nanoId()}`,
  default: {
    desc: '',
    events: [],
    name: '',
    private: false,
    url: '',
  },
});
