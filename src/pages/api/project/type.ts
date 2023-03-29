export interface PostProject {
  id: number;
  admin: string;
  channelName: string;
}

export interface DeleteProject {
  channelId: number;
  status: string;
}
