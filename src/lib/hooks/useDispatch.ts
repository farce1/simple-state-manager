import { useStoreContext } from '../context';

/**
 * Hook to get the store's dispatch function
 * @returns Store's dispatch function
 */
export function useDispatch() {
  const store = useStoreContext();

  return store.dispatch;
}
