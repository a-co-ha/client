export interface SocketPage {
  room: {
    _id: string;
    roomName: string;
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
