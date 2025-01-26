import { combineSlices } from '../../store';
import { Slice, Action } from '../../types';

describe('combineSlices', () => {
  interface CounterState {
    count: number;
  }

  interface TodoState {
    todos: string[];
  }

  interface AppState {
    counter: CounterState;
    todos: TodoState;
  }

  const counterSlice: Slice<CounterState> = {
    name: 'counter',
    initialState: { count: 0 },
    reducer: (state, action: Action) => {
      switch (action.type) {
        case 'INCREMENT':
          return { count: state.count + 1 };
        default:
          return state;
      }
    },
  };

  const todoSlice: Slice<TodoState> = {
    name: 'todos',
    initialState: { todos: [] },
    reducer: (state, action: Action) => {
      switch (action.type) {
        case 'ADD_TODO':
          return { todos: [...state.todos, action.payload] };
        default:
          return state;
      }
    },
  };

  it('should combine multiple slices into a single reducer', () => {
    const { reducer, initialState } = combineSlices<AppState>(counterSlice, todoSlice);

    expect(initialState).toEqual({
      counter: { count: 0 },
      todos: { todos: [] },
    });

    const newState = reducer(initialState, { type: 'INCREMENT' });
    expect(newState).toEqual({
      counter: { count: 1 },
      todos: { todos: [] },
    });
  });

  it('should handle actions for specific slices', () => {
    const { reducer, initialState } = combineSlices<AppState>(counterSlice, todoSlice);

    const state1 = reducer(initialState, { type: 'INCREMENT' });
    const state2 = reducer(state1, {
      type: 'ADD_TODO',
      payload: 'Test todo',
    });

    expect(state2).toEqual({
      counter: { count: 1 },
      todos: { todos: ['Test todo'] },
    });
  });
});
