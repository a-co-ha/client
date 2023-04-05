// import { useLayoutEffect, createContext, useEffect } from 'react';
// import io, { Socket } from 'socket.io-client';
// import { DefaultEventsMap } from '@socket.io/component-emitter';
import React from 'react';

export const SocketContextProvider = () => {
  return <div>SocketContextProvider</div>;
};

// interface Context {
//   messageSend: () => void;
// }

// export const SocketContext = createContext<Context>(undefined as any);

// export const SocketContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   // let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
//   const socket = io(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}`, {
//     // auth: {
//     //   sessionId: `EvwpomSUR5VI4C7SSPR_dIUv0EIDDXQ-`,
//     //   user: {
//     //     userId: 96574345,
//     //     name: 'tangjinlog',
//     //     githubID: 'tangjinlog',
//     //     githubURL: 'https://github.com/tangjinlog',
//     //     img: 'https://avatars.githubusercontent.com/u/96574345?v=4',
//     //   },
//     // },
//   });
//   // socket.on('connect', () => {
//   //   console.log(`socket connected`, socket.connected);
//   //   console.log(socket);
//   // });
//   // useLayoutEffect(() => {
//   //   return () => {
//   //     socket.disconnect();
//   //   };
//   // }, []);

//   const joinRoom = ({ roomId, userId }: { roomId: string; userId: number }) => {
//     socket.emit(`JOIN_ROOM`, { userId, roomId });
//   };

//   const messageSend = () => {
//     console.log(`보냅니다`);
//     socket.emit(`message-send`, {
//       name: 'Yi suho',
//       githubID: 'yisuho',
//       img: 'img',
//       text: '(승하, 수호)에게 12번 채널에서 보냅니다 ',
//       channelId: '642bf',
//     });
//   };

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
//   };

//   return (
//     <SocketContext.Provider value={messageSend}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
