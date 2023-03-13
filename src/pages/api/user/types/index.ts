export interface OauthResponseData {
  github_id: string;
  github_url: string;
  img: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

type UserType = Omit<OauthResponseData, 'accessToken' | 'refreshToken'>;

export interface User extends UserType {
  channel_id: string;
  channel_name: string;
  channel_admin: string;
  channel_img: string;
}

export interface GetUser {
  (): Promise<User[]>;
}

export interface OauthResponse {
  (authCode: string | string[] | undefined): Promise<OauthResponseData>;
}
