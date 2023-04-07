import { atom } from 'recoil';
import { nanoId } from '@/utils/nanoId';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export const socketState = atom<Socket<DefaultEventsMap, DefaultEventsMap>>({
  key: `socket/${nanoId()}`,
  // default: Socket<DefaultEventsMap, DefaultEventsMap>,
});
