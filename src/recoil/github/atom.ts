import { atom, atomFamily } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import type {
  CommitLogOrgsResponse,
  CommitLogOrgResponse,
  CommitLogReposResponse,
} from '@/pages/api/github/type';

export const commitLogModalFormState = atom({
  key: `commitLogModalFormState/${nanoId()}`,
  default: false,
});

export const commitLogModalOrgsSearchState = atom<CommitLogOrgsResponse[]>({
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

export const commitLogModalReposSearchState = atom<CommitLogReposResponse[]>({
  key: `commitLogModalRepoSearchState/${nanoId()}`,
  default: [
    // desc: '',
    // events: [],
    // name: '',
    // private: false,
    // url: '',
  ],
});

export const commitLogModalOrgSearchState = atom<CommitLogOrgResponse>({
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

export const githubConnectState = atomFamily({
  key: `githubConnectState/${nanoId()}`,
  default: {
    repoName: '',
    repoType: '',
  },
});
