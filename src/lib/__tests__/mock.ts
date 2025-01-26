import { Action } from '../types';
import { combineSlices } from '../store/combineSlices';

interface TestCounterState {
  count: number;
}

export interface TestState {
  counter: TestCounterState;
}

const testCounterInitialState: TestCounterState = { count: 0 };

const counterSlice = {
  name: 'counter',
  initialState: testCounterInitialState,
  reducer: (state: TestCounterState = testCounterInitialState, action: Action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + 1 };
      default:
        return state;
    }
  },
};

const { reducer, initialState } = combineSlices<TestState>(counterSlice);

export { reducer as testReducer, initialState as testInitialState };
