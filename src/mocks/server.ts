import { setupServer } from 'msw/node';
import handlers2 from './handlers2';

export const server = setupServer(...handlers2);
