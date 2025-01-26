import { useState, useEffect } from 'react';
import { useStoreContext } from '../context';

/**
 * Hook to get both state and dispatch
 * @returns Tuple of [state, dispatch]
 */
export function useStore<T>() {
  const store = useStoreContext<T>();
  const [state, setState] = useState<T>(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });

    return () => unsubscribe();
  }, [store]);

  return [state, store.dispatch] as const;
}
