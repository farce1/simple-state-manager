import { Action, Store, Middleware } from '../types';

/**
 * Composes multiple functions from right to left
 */
function compose(...funcs: Function[]) {
  // If no functions provided, return identity function
  if (funcs.length === 0) {
    return (arg: any) => arg;
  }

  // If single function provided, return it directly
  if (funcs.length === 1) {
    return funcs[0];
  }

  // Compose multiple functions from right to left
  return funcs.reduce((prevFn, nextFn) => {
    return (...args: any[]) => {
      return prevFn(nextFn(...args));
    };
  });
}

/**
 * Creates a new store with the given reducer, initial state, and optional middleware
 */
export function createStore<T>(
  reducer: (state: T, action: Action) => T,
  initialState: T,
  ...middleware: Middleware<T>[]
): Store<T> {
  let state = initialState;
  let listeners: (() => void)[] = [];

  // Create the store instance
  const store = {
    getState: () => state,

    dispatch: (action: Action) => {
      if (!action || typeof action !== 'object' || !action.type) {
        throw new Error('Action must be an object with a type property');
      }

      state = reducer(state, action);
      listeners.forEach((listener) => listener());

      return action;
    },

    subscribe: (listener: () => void) => {
      if (typeof listener !== 'function') {
        throw new Error('Listener must be a function');
      }

      listeners.push(listener);

      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
  };

  // Apply middleware
  if (middleware.length > 0) {
    const chain = middleware.map((m) => m(store));
    const originalDispatch = store.dispatch;
    store.dispatch = compose(...chain)(originalDispatch);
  }

  // Initialize the store
  store.dispatch({ type: '@@INIT' });

  return store;
}
