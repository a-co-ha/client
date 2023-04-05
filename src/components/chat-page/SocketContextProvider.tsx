import { useLayoutEffect, createContext, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { getCookie } from 'cookies-next';

interface Context {
  messageSend: () => void;
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
        const sessionId = getCookie(`sessionId`);
        if (!sessionId) return;
        socket = io(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}`, {
          auth: {
            sessionId,
            user: {
              userId: 96574345,
              name: 'tangjinlog',
              githubID: 'tangjinlog',
              githubURL: 'https://github.com/tangjinlog',
              img: 'https://avatars.githubusercontent.com/u/96574345?v=4',
            },
          },
        });
        socket.on(`connect`, () => {
          resolve(socket);
          console.log(`connected`, socket);
        });
        socket.on(`connect_error`, (error) => reject(error));

        // socket.on(`users`, (data) => {
        //   console.log(`user socket`, data);
        // });
        socket.on(`session`, (data) => {
          console.log(`session sockeet data`, data);
        });
      });
    };
    connectSocket();
  }, []);

  const messageSend = () => {
    console.log(`보냅니다`);
    socket.emit(`message-send`, {
      name: 'Yi suho',
      githubID: 'yisuho',
      img: 'img',
      text: '(승하, 수호)에게 12번 채널에서 보냅니다 ',
      channelId: '642bf',
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
    <SocketContext.Provider value={{ messageSend }}>
      {children}
    </SocketContext.Provider>
  );
};
