export interface commitLogFormType {
  searchOptionsInput: string;
}

export interface commitLogOrgResponse {
  desc: string | null;
  name: string;
  orgImg: string;
  orgID: number;
}

export interface commitLogRepoResponse {
  name: string;
  isPrivate: boolean;
  desc: null | string;
  url: string;
}
