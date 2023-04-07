import { useLayoutEffect, createContext, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { getCookies } from 'cookies-next';
import type { ChatUserData } from './type';

interface Context {
  sendMessage: (text: string, roomId: string) => void;
}

export const SocketContext = createContext<Context>(null as any);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  useEffect(() => {
    const connectSocket = (): Promise<any> => {
      return new Promise((resolve, reject) => {
        const { sessionId, accessToken } = getCookies();
        console.log(`session id`, sessionId);
        if (!sessionId) return;
        socket = io(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}`, {
          auth: {
            sessionId,
            token: `access ${accessToken}`,
          },
        });
        socket.on(`connect`, () => {
          resolve(socket);
          console.log(`connected`, socket);
        });
        socket.on(`connect_error`, (error) => reject(error));

        socket.on(`users`, (data) => {
          console.log(`user socket`, data);
        });
        socket.on(`session`, (data) => {
          console.log(`session sockeet data`, data);
        });
      });
    };
    connectSocket();
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (text: string, roomId: string) => {
    console.log(`보냅니다`);
    socket.emit(`SEND_MESSAGE`, {
      text,
      roomId,
    });
  };

  //   const sendMessage = ({
  //     roomId,
  //     userId,
  //     message,
  //   }: {
  //     roomId: string;
  //     userId: number;
  //     message: string;
  //   }) => {
  //     socket.emit(`SEND_MESSAGE`, { userId, roomId, message });
  //   };
  //   const updateMessage = (func: (msg: string) => void) => {
  //     socket.on(`UPDATE_MESSAGE`, (msg) => func(msg));

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
