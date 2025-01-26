# Simple State Manager

A lightweight TypeScript state management tool for React applications, inspired by Redux but with a simpler API and built-in TypeScript support.

## Features

- 🎯 Lightweight and minimalistic API
- 📦 Built with TypeScript for type safety
- ⚡ Efficient state updates with React hooks
- 🔄 Middleware support for side effects
- 🧩 Modular slice-based architecture
- 🔍 DevTools support with built-in logger

## Project Installation

```bash
bun install
```

## Core Concepts

### Store

The central state container that holds the application's state tree.

### Slices

Modular pieces of state with their own reducers and actions.

### Actions

Plain objects describing state changes.

### Middleware

Functions that provide a third-party extension point between dispatching an action and reaching the reducer.

## Basic Usage

```typescript
import { createStore, StoreProvider, useSelector, useDispatch } from '@lib';

// Define a reducer state slice
const counterSlice = {
  name: 'counter',
  initialState: { count: 0 },
  reducer: (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + 1 };
      case 'DECREMENT':
        return { count: state.count - 1 };
      default:
        return state;
    }
  }
};

// Create store
const store = createStore(counterSlice.reducer, counterSlice.initialState);

// Use in components
function Counter() {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}

// Wrap your app with context provider
function App() {
  return (
    <StoreProvider store={store}>
      <Counter />
    </StoreProvider>
  );
}
```

## Advanced Features

### Middleware Support

```typescript
import { logger } from '@lib';

const store = createStore(reducer, initialState, logger);
```

### Combining Slices

```typescript
import { combineSlices } from '@lib';

const { reducer, initialState } = combineSlices(counterSlice, todosSlice, userSlice);
```

### Custom Hooks

#### useSelector

```typescript
const count = useSelector((state) => state.counter.count);
```

#### useDispatch

```typescript
const dispatch = useDispatch();
```

#### useStore

```typescript
const [state, dispatch] = useStore();
```

## TypeScript Support

The library is built with TypeScript and provides full type safety:

```typescript
interface CounterState {
  count: number;
}

interface Action {
  type: string;
  payload?: any;
}

const counterSlice: Slice<CounterState> = {
  name: 'counter',
  initialState: { count: 0 },
  reducer: (state: CounterState, action: Action): CounterState => {
    // Type-safe reducer implementation
  },
};
```

## Testing

The library includes a comprehensive test suite. Run tests with:

```bash
bun run test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details
