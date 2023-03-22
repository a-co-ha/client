export interface OauthResponseData {
  github_id: string;
  github_url: string;
  img: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

// type UserType = Omit<OauthResponseData, 'accessToken' | 'refreshToken'>;

export interface User {
  id: number;
  github_id: string;
  github_url: string;
  img: string;
  name: string;
  channels: ChannelList[];
}

export interface ChannelList {
  id: number;
  admin: string;
  channelName: string;
  channelImg: string;
}
