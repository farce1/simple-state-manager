import { createContext, useContext, ReactNode } from 'react';
import { Store } from '../types';

interface StoreProviderProps<T> {
  store: Store<T>;
  children: ReactNode;
}

const StoreContext = createContext<Store<any> | null>(null);

export function StoreProvider<T>({ store, children }: StoreProviderProps<T>) {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStoreContext<T>(): Store<T> {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
}
