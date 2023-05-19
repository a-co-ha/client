import { createContext, useEffect, useLayoutEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { getCookie } from 'cookies-next';
import { useSetRecoilState } from 'recoil';
import { onUserState } from '@/recoil/socket/atom';
import type { SocketMessage } from '@/pages/api/socket/type';

interface Context {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  socketDisconnect: () => void;
  readMessage: (pageId: string) => void;
  getMessage: (func: (data: SocketMessage[]) => void) => void;
  sendMessage: (message: string, pageId: string) => void;
  receiveMessage: (func: (message: any) => void) => void;
  setBookmark: (bookmark: {
    bookmarkName: string;
    content: string;
    roomId: string;
  }) => void;
  newBookmark: (func: any) => void;
  newMember: (func: (user: any) => void) => void;
  disconnectMember: (func: (user: any) => void) => void;
  joinChannel: (channelId: string) => void;
}

export const SocketContext = createContext<Context>(null as any);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setOnUser = useSetRecoilState(onUserState);
  const sessionId = getCookie(`sessionId`);

  let socket = io(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}`, {
    auth: {
      sessionID: sessionId,
    },
    withCredentials: true,
  });

  useLayoutEffect(() => {
    if (!sessionId) return;
    socket.on(`connect`, () => {
      console.log(`connected`, socket);
    });
    socket.on(`connect_error`, (error) => console.log(error));

    socket.on(`MEMBERS`, (data) => {
      setOnUser(data);
      console.log(`MEMBERS`, data);
    });
    socket.on(`USER_INFO`, (data) => {
      console.log(`session USER_INFO`, data);
    });
    socket.on(`NEW_MEMBER`, (data) => console.log(`유저 접속`, data));

    return () => {
      console.log(`disconnect`);
      socket.disconnect();
    };
  }, [sessionId, socket]);

  const socketDisconnect = () => {
    socket.disconnect();
  };

  const readMessage = (pageId: string) => {
    console.log(`소케엣`, socket);
    console.log(`보냅니다`);
    socket.emit(`READ_MESSAGE`, {
      roomId: pageId,
    });
  };
  const getMessage = (func: any) => {
    socket.on(`GET_MESSAGE`, (data: SocketMessage[]) => {
      console.log(`리드`, data);
      func(data);
    });
  };
  const sendMessage = (message: string, pageId: string) => {
    console.log(`보냅니다`);
    socket.emit(`SEND_MESSAGE`, {
      content: message,
      roomId: pageId,
    });
  };
  const receiveMessage = (func: any) => {
    console.log(`받습니다`);
    socket.on(`RECEIVE_MESSAGE`, (data) => {
      console.log(`없는듯`, data);
      func(data.message);
    });
  };
  const setBookmark = (bookmark: {
    bookmarkName: string;
    content: string;
    roomId: string;
  }) => {
    socket.emit(`SET_BOOKMARK`, {
      bookmarkName: bookmark.bookmarkName,
      content: bookmark.content,
      roomId: bookmark.roomId,
    });
  };

  const newBookmark = (func: any) => {
    socket.on(`NEW_BOOKMARK`, (data) => {
      console.log(`받습니다`);
      func(data);
      console.log(`여기다`, data);
    });
  };

  const newMember = (func: any) => {
    socket.on(`NEW_MEMBER`, (user) => {
      func(user);
    });
  };
  const disconnectMember = (func: any) => {
    socket.on(`DISCONNECT_MEMBER`, (user) => {
      func(user);
    });
  };
  const joinChannel = (channelId: string) => {
    socket.emit(`JOIN_CHANNEL`, {
      channelId,
    });
  };

  return (
    <SocketContext.Provider
      value={{
        socketDisconnect,
        readMessage,
        getMessage,
        sendMessage,
        receiveMessage,
        setBookmark,
        newBookmark,
        newMember,
        disconnectMember,
        joinChannel,
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
