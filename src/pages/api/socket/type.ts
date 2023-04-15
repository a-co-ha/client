export interface SocketPage {
  page: {
    _id: string;
    pageName: string;
    type: string;
    categories: string;
  };
  _id: string;
}

export interface SocketMessage {
  roomId: string;
  text: string;
  from: number;
  name: string;
  img: string;
  to: string;
  createAt: string;
}
