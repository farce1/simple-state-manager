import { Slice, Action } from '@/lib';
import { AppState } from '@/types';

export interface CounterState {
  count: number;
}

export const COUNTER_ACTION_TYPES = {
  INCREMENT: 'counter/increment',
  DECREMENT: 'counter/decrement',
  RESET: 'counter/reset',
} as const;

export const counterActions = {
  increment: (): Action => ({ type: COUNTER_ACTION_TYPES.INCREMENT }),
  decrement: (): Action => ({ type: COUNTER_ACTION_TYPES.DECREMENT }),
  reset: (): Action => ({
    type: COUNTER_ACTION_TYPES.RESET,
  }),
};

export const counterSelectors = {
  getCount: (state: AppState) => state.counter.count,
};

export const counterSlice: Slice<CounterState> = {
  name: 'counter',
  initialState: { count: 0 },
  reducer: (state = { count: 0 }, action: Action): CounterState => {
    switch (action.type) {
      case COUNTER_ACTION_TYPES.INCREMENT:
        return { count: state.count + 1 };
      case COUNTER_ACTION_TYPES.DECREMENT: {
        if (state.count === 0) {
          return state;
        }

        return { count: state.count - 1 };
      }
      case COUNTER_ACTION_TYPES.RESET:
        return { count: 0 };
      default:
        return state;
    }
  },
};
