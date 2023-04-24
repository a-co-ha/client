export interface ChatMessage {
  chatMessage: string;
}

export interface ChatUserData {
  text: string;
  roomId: string;
}

export interface MessageType {
  userId: number;
  name: string;
  content: string;
  img: string;
  isDisplay: boolean;
  currentMsgTime: string;
}
