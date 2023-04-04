import { useEffect, createContext } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export const SocketContext = createContext({});

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}`);
    return () => {
      socket.disconnect();
    };
  }, []);

  const joinRoom = ({ roomId, userId }: { roomId: string; userId: number }) => {
    socket.emit(`JOIN_ROOM`, { userId, roomId });
  };
  const sendMessage = ({
    roomId,
    userId,
    message,
  }: {
    roomId: string;
    userId: number;
    message: string;
  }) => {
    socket.emit(`SEND_MESSAGE`, { userId, roomId, message });
  };
  const updateMessage = (func: (msg: string) => void) => {
    socket.on(`UPDATE_MESSAGE`, (msg) => func(msg));
  };

  return (
    <SocketContext.Provider value={{ joinRoom, sendMessage, updateMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
