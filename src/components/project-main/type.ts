export interface CommitLogFormType {
  searchOptionsInput: string;
}

export interface CommitLogOrgResponse {
  desc: string | null;
  name: string;
  orgImg: string;
  orgID: number;
}

export interface CommitLogRepoResponse {
  name: string;
  isPrivate: boolean;
  desc: null | string;
  url: string;
}

export interface ConfirmModalType {
  title: string;
  content: string;
  confirmFunc: () => void;
  // cancelFunc: React.Dispatch<React.SetStateAction<boolean>>;
  cancelFunc: () => void;
}
