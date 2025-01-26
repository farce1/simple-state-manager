import { createStore } from '../../store';
import { Action } from '../../types';
import { testReducer, testInitialState, TestState } from '../mock';

describe('createStore', () => {
  it('should create a store with initial state', () => {
    const store = createStore<TestState>(testReducer, testInitialState);
    expect(store.getState()).toEqual(testInitialState);
  });

  it('should update state when dispatching an action', () => {
    const store = createStore<TestState>(testReducer, testInitialState);
    store.dispatch({ type: 'INCREMENT' });
    expect(store.getState()).toEqual({ counter: { count: 1 } });
  });

  it('should notify subscribers when state changes', () => {
    const store = createStore<TestState>(testReducer, testInitialState);
    const listener = jest.fn();

    store.subscribe(listener);
    store.dispatch({ type: 'INCREMENT' });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('should unsubscribe listeners', () => {
    const store = createStore<TestState>(testReducer, testInitialState);
    const listener = jest.fn();

    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    store.dispatch({ type: 'INCREMENT' });

    expect(listener).not.toHaveBeenCalled();
  });

  it('should throw error for invalid action', () => {
    const store = createStore<TestState>(testReducer, testInitialState);
    expect(() => store.dispatch({} as Action)).toThrow();
  });
});
