import { useState, useEffect } from 'react';
import { useStoreContext } from '../context';

/**
 * Hook to select and subscribe to a specific slice of store state
 * @param selector Function that takes the state and returns a selected value
 * @returns Selected value from the store state
 */
export function useSelector<Selected, T>(selector: (state: T) => Selected): Selected {
  const store = useStoreContext();

  const [selectedState, setSelectedState] = useState(() => selector(store.getState() as T));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newSelectedState = selector(store.getState() as T);

      setSelectedState(newSelectedState);
    });

    return unsubscribe;
  }, [store, selector]);

  return selectedState;
}
