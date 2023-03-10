export interface User {
  github_id: string;
  github_url: string;
  img: string;
  name: string;
  channel_id: string;
  channel_name: string;
  channel_admin: string;
  channel_img: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface GetUser {
  (): Promise<User[]>;
}

export interface OauthResponse {
  (authCode: string | string[] | undefined): Promise<User[]>;
}
