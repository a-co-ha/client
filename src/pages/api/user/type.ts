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
  userId: number;
  github_id: string;
  github_url: string;
  img: string;
  name: string;
  channels: ChannelList[];
}

export interface ChannelList {
  id: number;
  userId: number;
  channelName: string;
  channelImg: string;
}

export interface ChannelUser {
  id: number;
  admin: boolean;
  userId: number;
  name: string;
}

export interface InviteUser {
  userId: string;
  channelId: number;
  channelName: string;
}
