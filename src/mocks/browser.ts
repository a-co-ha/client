import { setupWorker } from 'msw';
import handlers2 from './handlers2';

export const worker = setupWorker(...handlers2);
