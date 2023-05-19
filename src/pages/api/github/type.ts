export interface CommitLogFormType {
  searchOptionsInput: string;
}

export interface CommitLogOrgsResponse {
  desc: string | null;
  name: string;
  orgImg: string;
  orgID: number;
}

export interface CommitLogReposResponse {
  name: string;
  isPrivate: boolean;
  desc: null | string;
  url: string;
}

export interface CommitLogOrgResponse {
  desc: string;
  img: string;
  name: string;
  url: string;
  repos: {
    name: string;
    url: string;
  }[];
}

export interface CommitLogRepoResponse {
  name: string;
  desc: string;
  url: string;
}

export interface CommitRegisterResponse {
  desc: string;
  name: string;
  type: string;
  url: string;
}

export interface ConfirmModalType {
  title: string;
  content: string;
  confirmFunc: () => void;
  // cancelFunc: React.Dispatch<React.SetStateAction<boolean>>;
  cancelFunc: () => void;
}

export interface CommitLogGithubRegister {
  repoName: string;
  repoType: string;
}

export interface CommitList {
  id: string;
  created_at: string;
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    ref: string;
    head: string;
    commits: {
      author: {
        name: string;
      };
      message: string;
      url: string;
    }[];
  };
  type: string;
}

export interface IssueList {
  url: string;
  title: string;
  user: {
    name: string;
  };
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  createAt: string;
}

export interface OrgCommitTransferedData {
  message: string;
  author: string;
  branch: string;
  time: string;
  url: string;
}

export interface OrgIssueTransferedData {
  title: string;
  author: string;
  labels: {
    name: string;
    color: string;
  }[];
  time: string;
  url: string;
}

export interface OrgRepoName {
  org?: string;
  owner?: string;
  repo: string;
}
