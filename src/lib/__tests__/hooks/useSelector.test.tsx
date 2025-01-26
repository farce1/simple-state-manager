import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { StoreProvider } from '../../context';
import { useSelector } from '../../hooks';
import { createStore } from '../../store';
import { testInitialState, testReducer, TestState } from '../mock';

describe('useSelector', () => {
  const store = createStore<TestState>(testReducer, testInitialState);

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <StoreProvider store={store}>{children}</StoreProvider>
  );

  it('should select and subscribe to store state', () => {
    const { result } = renderHook(() => useSelector((state: TestState) => state.counter.count), {
      wrapper,
    });

    expect(result.current).toBe(0);

    act(() => {
      store.dispatch({ type: 'INCREMENT' });
    });

    expect(result.current).toBe(1);
  });
});
