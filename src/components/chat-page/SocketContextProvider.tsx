import { createContext, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { getCookie } from 'cookies-next';

interface Context {
  sendMessage: (text: string, roomId: string) => void;
  // logout: () => void;
}

export const SocketContext = createContext<Context>(null as any);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  const sessionId = getCookie(`sessionId`);
  useEffect(() => {
    if (!sessionId) return;
    const connectSocket = (): Promise<
      Socket<DefaultEventsMap, DefaultEventsMap>
    > => {
      return new Promise((resolve, reject) => {
        socket = io(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}`, {
          auth: {
            sessionID: sessionId,
          },
          withCredentials: true,
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
  }, [sessionId]);

  const sendMessage = (text: string, roomId: string) => {
    console.log(`보냅니다`);
    socket.emit(`SEND_MESSAGE`, {
      text,
      roomId,
    });
  };

  // const logout = () => {
  //   socket.disconnect();
  // };

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
