import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { StoreProvider } from '../../context';
import { useDispatch } from '../../hooks';
import { createStore } from '../../store';
import { testInitialState, testReducer } from '../mock';

describe('useDispatch', () => {
  const store = createStore(testReducer, testInitialState);

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <StoreProvider store={store}>{children}</StoreProvider>
  );

  it('should return dispatch function', () => {
    const { result } = renderHook(() => useDispatch(), { wrapper });

    act(() => {
      result.current({ type: 'INCREMENT' });
    });

    expect(store.getState().counter.count).toBe(1);
  });

  it('should maintain reference equality', () => {
    const { result, rerender } = renderHook(() => useDispatch(), { wrapper });
    const firstDispatch = result.current;

    rerender();
    expect(result.current).toBe(firstDispatch);
  });
});
