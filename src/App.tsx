import { createStore, StoreProvider, combineSlices, logger as loggerMiddleware } from '@/lib';
import { Counter } from '@/components/Counter';
import { counterSlice } from '@/features/counter/counterSlice';
import { AppState } from '@/types';
import './App.css';

const { reducer, initialState } = combineSlices<AppState>(counterSlice);

const store = createStore(reducer, initialState, loggerMiddleware);

function App() {
  return (
    <StoreProvider store={store}>
      <div className='app'>
        <h1>State Management Demo</h1>
        <Counter />
      </div>
    </StoreProvider>
  );
}

export default App;
