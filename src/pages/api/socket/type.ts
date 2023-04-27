export interface SocketPage {
  page: {
    _id: string;
    pageName: string;
    type: string;
    categories: string;
  };
  _id: string;
}

export interface SocketMessageResponse {
  roomId: string;
  messages: SocketMessage[];
}

export interface SocketMessage {
  name: string;
  content: string;
  img: string;
  userId: number;
  createdAt: string;
}

export interface ChatBookmark {
  _id: string;
  channelId: number;
  bookmarkName: string;
  content: string;
  userId: number;
  userName: string;
  type: string;
  categories: string;
  createdAt: string;
  updatedAt: string;
}

export interface PutSocketPage {
  _id: string;
  channelId: number;
  pageName: string;
  type: string;
  categories: string;
  bookmarkList: ChatBookmark[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostSocketPage {
  channelId: number;
  pageName: string;
  type: string;
  categories: string;
  _id: string;
  bookmarkList: ChatBookmark[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
