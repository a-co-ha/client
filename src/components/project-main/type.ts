export interface commitLogFormType {
  searchOptionsInput: string;
  searchInput: string;
}

export interface commitLogOrgResponse {
  desc: string | null;
  orgImg: string;
  orgName: string;
  orgUrl: string;
  repos: {
    name: string;
    url: string;
  }[];
}

export interface commitLogRepoResponse {
  desc: string | null;
  events: [];
  name: string;
  private: boolean;
  url: string;
}
