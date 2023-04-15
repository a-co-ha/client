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
