import { Middleware } from '../types';

/**
 * Logs all actions and states after they are dispatched
 */
export const logger: Middleware<any> = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('dispatching:', action);
  console.log('prev state:', store.getState());

  const result = next(action);

  console.log('next state:', store.getState());
  console.groupEnd();

  return result;
};
