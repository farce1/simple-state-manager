import { render, screen } from '@testing-library/react';
import { StoreProvider, useStoreContext } from '../../context';
import { createStore } from '../../store';
import { testInitialState, testReducer } from '../mock';

describe('StoreContext', () => {
  const store = createStore(testReducer, testInitialState);

  const TestComponent = () => {
    const store = useStoreContext();
    const state = store.getState();

    return <div data-testid='test'>{JSON.stringify(state)}</div>;
  };

  it('should provide store to children', () => {
    render(
      <StoreProvider store={store}>
        <TestComponent />
      </StoreProvider>
    );

    expect(screen.getByText(JSON.stringify(testInitialState))).toBeInTheDocument();
  });

  it('should throw error when used outside provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useStoreContext must be used within a StoreProvider');

    consoleError.mockRestore();
  });
});
