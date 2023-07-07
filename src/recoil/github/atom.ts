import type {
  CommitLogGithubRegister,
  CommitLogOrgResponse,
  CommitLogOrgsResponse,
  CommitLogRepoResponse,
  CommitLogReposResponse,
  OrgCommitTransferedData,
  OrgIssueTransferedData,
} from '@/pages/api/github/type';
import { nanoId } from '@/utils/nanoId';
import { atom, atomFamily } from 'recoil';

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
    img: '',
    name: '',
    url: '',
    repos: [
      {
        name: '',
        url: '',
      },
    ],
  },
});

export const commitLogModalRepoSearchState = atom<CommitLogRepoResponse>({
  key: `commitLogModalRepoSearchState/${nanoId()}`,
  default: {
    desc: '',
    name: '',
    url: '',
  },
});

export const githubConnectState = atomFamily<
  CommitLogGithubRegister,
  string | string[] | undefined
>({
  key: `githubConnectState/${nanoId()}`,
  default: {
    repoName: '',
    repoType: '',
  },
});

export const githubOrgCommitState = atom<OrgCommitTransferedData[]>({
  key: `githubOrgCommitState/${nanoId()}`,
  default: [],
});

export const githubOrgIssueState = atom<OrgIssueTransferedData[]>({
  key: `githubOrgIssueState/${nanoId()}`,
  default: [],
});

export const githubRepoCommitState = atom<OrgCommitTransferedData[]>({
  key: `githubRepoCommitState/${nanoId()}`,
  default: [],
});

export const githubRepoIssueState = atom<OrgIssueTransferedData[]>({
  key: `githubRepoIssueState/${nanoId()}`,
  default: [],
});

export const githubCommitErrorState = atom({
  key: `githubCommitErrorState/${nanoId()}`,
  default: false,
});
