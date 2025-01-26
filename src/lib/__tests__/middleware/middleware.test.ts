import { createStore } from '../../store';
import { Middleware } from '../../types';
import { testInitialState, testReducer, TestState } from '../mock';

describe('Middleware', () => {
  it('should apply middleware in the correct order', () => {
    const executionOrder: number[] = [];

    const middleware1: Middleware<TestState> = () => (next) => (action) => {
      executionOrder.push(1);
      return next(action);
    };

    const middleware2: Middleware<TestState> = () => (next) => (action) => {
      executionOrder.push(2);
      return next(action);
    };

    const store = createStore<TestState>(testReducer, testInitialState, middleware1, middleware2);
    store.dispatch({ type: 'INCREMENT' });

    expect(executionOrder).toEqual([1, 2, 1, 2]);
  });

  it('should allow middleware to modify actions', () => {
    const modifyAction: Middleware<TestState> = () => (next) => (action) => {
      if (action.type === 'DOUBLE_INCREMENT') {
        return next({ type: 'INCREMENT' }) && next({ type: 'INCREMENT' });
      }
      return next(action);
    };

    const store = createStore<TestState>(testReducer, testInitialState, modifyAction);
    store.dispatch({ type: 'DOUBLE_INCREMENT' });

    expect(store.getState().counter.count).toBe(2);
  });

  it('should allow middleware to access store', () => {
    const states: number[] = [];

    const trackState: Middleware<TestState> = (store) => (next) => (action) => {
      states.push(store.getState().counter.count);
      const result = next(action);
      states.push(store.getState().counter.count);
      return result;
    };

    const store = createStore<TestState>(testReducer, testInitialState, trackState);
    store.dispatch({ type: 'INCREMENT' });

    expect(states).toEqual([0, 0, 0, 1]);
  });
});
