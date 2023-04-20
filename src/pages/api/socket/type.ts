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
  text: string;
  img: string;
  userId: number;
  createdAt: string;
}

export interface chatBookmark {
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
