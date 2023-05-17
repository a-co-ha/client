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
  orgImg: string;
  orgName: string;
  orgUrl: string;
  repos: {
    name: string;
    url: string;
  }[];
}

export interface CommitLogRepoResponse {
  name: string;
  private: boolean;
  desc: string;
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

export interface OrgCommitList {
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

export interface OrgCommitTransferedData {
  message: string;
  author: string;
  branch: string;
  time: string;
  url: string;
}

export interface OrgRepoName {
  org: string;
  repo: string;
}
