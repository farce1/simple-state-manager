import { createStore } from './store.js';

// Define a simple counter reducer
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'SET_COUNT':
      return { count: action.payload };
    default:
      return state;
  }
};

// Create a store instance
const store = createStore(counterReducer, { count: 0 });

// Subscribe to state changes
const unsubscribe = store.subscribe(() => {
  console.log('Current state:', store.getState());
});

// Test the store
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
store.dispatch({ type: 'SET_COUNT', payload: 10 });

// Unsubscribe when done
unsubscribe();
