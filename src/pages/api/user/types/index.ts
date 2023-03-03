export interface User {
  github_id: string;
  github_url: string;
  img: string;
  name: string;
  channel_id: string;
  channel_name: string;
  channel_admin: string;
  channel_img: string;
}

export interface GetUser {
  (): Promise<User[]>;
}
