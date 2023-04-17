import { createContext, useEffect, useLayoutEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { getCookie } from 'cookies-next';
import { useSetRecoilState } from 'recoil';
import { onUserState } from '@/recoil/socket/atom';

interface Context {
  // sendMessage: (text: string, roomId: string) => void;
  // receiveMessage: (data: any) => void;
  logout: () => void;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
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

  // let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  useEffect(() => {
    if (!sessionId) return;
    socket.on(`connect`, () => {
      console.log(`connected`, socket);
    });
    socket.on(`connect_error`, (error) => console.log(error));

    socket.on(`users`, (data) => {
      setOnUser(data);
      console.log(`user socket`, data);
    });
    socket.on;
    socket.on(`session`, (data) => {
      console.log(`session sockeet data`, data);
    });

    // const connectSocket = (): Promise<
    //   Socket<DefaultEventsMap, DefaultEventsMap>
    // > => {
    //   return new Promise((resolve, reject) => {
    //     socket = io(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}`, {
    //       autoConnect: false,
    //       auth: {
    //         sessionID: sessionId,
    //       },
    //       withCredentials: true,
    //     });
    //     socket.connect();
    //     socket.on(`connect`, () => {
    //       resolve(socket);
    //       console.log(`connected`, socket);
    //     });
    //     socket.on(`connect_error`, (error) => reject(error));

    //     socket.on(`users`, (data) => {
    //       setOnUser(data);
    //       console.log(`user socket`, data);
    //     });
    //     socket.on(`session`, (data) => {
    //       console.log(`session sockeet data`, data);
    //     });
    //   });
    // };
    // connectSocket();
  }, [sessionId]);
  // useEffect(() => {
  //   let socket = io(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}`, {
  //     auth: {
  //       sessionID: sessionId,
  //     },
  //     withCredentials: true,
  //   });
  //   socket.on(`connect`, () => {
  //     console.log(`connected`, socket);
  //   });
  //   socket.on(`connect_error`, (error) => console.log(error));

  //   socket.on(`users`, (data) => {
  //     setOnUser(data);
  //     console.log(`user socket`, data);
  //   });
  //   socket.on(`session`, (data) => {
  //     console.log(`session sockeet data`, data);
  //   });

  // })e
  // const sendMessage = (text: string, roomId: string) => {
  //   console.log(`소케엣`, socket);
  //   console.log(`보냅니다`);
  //   console.log(`메세지 데이타`, text, roomId);
  //   socket.emit(`message-send`, {
  //     text,
  //     roomId,
  //   });
  // };
  // const receiveMessage = (func: any) => {
  //   console.log(`받습니다`);
  //   socket.on(`message-receive`, (data) => {
  //     console.log(`없는듯`, data);
  //     func(data.message);
  //   });
  // };

  const logout = () => {
    socket.disconnect();
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
    <SocketContext.Provider value={{ logout, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
