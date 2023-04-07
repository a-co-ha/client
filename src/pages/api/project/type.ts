export interface PostProject {
  id: number;
  userId: number;
  channelName: string;
  channelImg: null;
}

export interface DeleteProject {
  channelId: number;
  status: string;
}

export interface ExitProject {
  message: string;
}
