import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { StoreProvider } from '../../context';
import { useStore } from '../../hooks';
import { createStore } from '../../store';
import { testInitialState, testReducer, TestState } from '../mock';

describe('useStore', () => {
  const store = createStore<TestState>(testReducer, testInitialState);

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <StoreProvider store={store}>{children}</StoreProvider>
  );

  it('should return state and dispatch', () => {
    const { result } = renderHook(() => useStore(), { wrapper });
    const [state, dispatch] = result.current;

    expect(state).toEqual({ counter: { count: 0 } });
    expect(typeof dispatch).toBe('function');
  });

  it('should update state when dispatching actions', () => {
    const { result } = renderHook(() => useStore(), { wrapper });

    act(() => {
      result.current[1]({ type: 'INCREMENT' });
    });

    expect(result.current[0]).toEqual({ counter: { count: 1 } });
  });

  it('should maintain dispatch reference equality', () => {
    const { result, rerender } = renderHook(() => useStore(), { wrapper });
    const [, firstDispatch] = result.current;

    rerender();
    const [, secondDispatch] = result.current;

    expect(secondDispatch).toBe(firstDispatch);
  });
});
