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
  text: string;
  isDisplayTime: boolean;
  currentMsgTime: string;
}
